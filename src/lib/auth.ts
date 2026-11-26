import NextAuth from 'next-auth'
import Discord from 'next-auth/providers/discord'
import { PrismaAdapter } from '@auth/prisma-adapter'
import prisma from '@/prisma'
import { enhance } from '@zenstackhq/runtime';

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Discord(
            {
                id: 'discord',
                userinfo: `https://discord.com/api/users/@me/guilds/${process.env.GUILD_ID}/member`,
                async profile(profile) {
                    if (profile.code === 10004) {
                        throw new Error("User is not a member of the required guild");
                    }
                    if (profile.avatar === null) {
                        const defaultAvatarNumber =
                            profile.user.discriminator === "0"
                                ? Number(BigInt(profile.user.id) >> BigInt(22)) % 6
                                : parseInt(profile.user.discriminator) % 5
                        profile.image_url = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`
                    } else {
                        const format = profile.avatar.startsWith("a_") ? "gif" : "png"
                        profile.image_url = `https://cdn.discordapp.com/avatars/${profile.user.id}/${profile.user.avatar}.${format}`
                    }
                    // Roles are synced in `events.signIn` so they also update for existing users
                    return {
                        id: profile.user.id,
                        name: profile.nick ?? profile.user.global_name ?? profile.user.username,
                        email: profile.user.email,
                        image: profile.image_url,
                    }
                },
                authorization: {
                    params: { scope: "guilds.members.read identify email" },
                },
            }
        )
    ],
    events: {
        // Runs on every sign-in (new and existing users) with the DB user and the raw
        // Discord guild member profile, so the user's roles mirror their current Discord roles.
        async signIn({ user, account, profile }) {
            if (account?.provider !== 'discord' || !user.id || !profile) return;

            const discordRoleIds: string[] = (profile.roles as string[] | undefined) ?? [];
            const knownRoles = await prisma.role.findMany({ select: { id: true } });
            const roleIds: bigint[] = knownRoles
                .map((role: { id: bigint }) => role.id)
                .filter((id: bigint) => discordRoleIds.includes(id.toString()));

            await prisma.$transaction([
                prisma.userRole.deleteMany({
                    where: { userId: user.id, roleId: { notIn: roleIds } },
                }),
                prisma.userRole.createMany({
                    data: roleIds.map(roleId => ({ userId: user.id!, roleId })),
                    skipDuplicates: true,
                }),
            ]);
        },
    },
    trustHost: true
});

export async function getPrisma() {
    const session = await auth();
    if (!session?.user) return enhance(prisma);

    const user = await prisma.user.findUnique(
        { 
            where: { id: session.user.id }, 
            include: { 
                roles: {
                    include: { role: true }
                }
            }
        }
    );

    const enhancedPrisma = enhance(prisma, { user } as any);
    return enhancedPrisma
}
