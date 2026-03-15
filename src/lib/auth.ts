import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import Discord from 'next-auth/providers/discord'
import { PrismaAdapter } from '@auth/prisma-adapter'
import prisma from '@/prisma'
import { enhance } from '@zenstackhq/runtime';
import { User } from '@prisma/client';

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        GitHub,
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
                    // Ugly fix ma bon
                    const roles = (await prisma.role.findMany()).map(role => role.id.toString());
                    profile.valid_roles = profile.roles.filter((role_id: string) => roles.includes(role_id));

                    return {
                        id: profile.user.id,
                        name: profile.nick ?? profile.user.global_name ?? profile.user.username,
                        email: profile.user.email,
                        image: profile.image_url,
                        roles: {
                            createMany: {
                                data: profile.valid_roles.map((role_id : string) => ({ roleId : BigInt(role_id) })),
                            }
                        },
                    }
                },
                authorization: {
                    params: { scope: "guilds.members.read identify email" },
                },
            }
        )
    ],
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

    // @ts-expect-error - TypeScript doesn't understand the enhance function and its return type
    const enhancedPrisma = enhance(prisma, { user } as User | null );
    return enhancedPrisma
}
