import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import Discord from 'next-auth/providers/discord'
import { PrismaAdapter } from '@auth/prisma-adapter'
import prisma from '@/prisma'

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        GitHub,
        Discord(
            {
                id: 'discord',
                userinfo: `https://discord.com/api/users/@me/guilds/${process.env.GUILD_ID}/member`,
                async profile(profile) {
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