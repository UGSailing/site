import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import Discord from 'next-auth/providers/discord'
import { PrismaAdapter } from '@auth/prisma-adapter'
import prisma from '@/prisma'

export const { handlers, auth, signIn, signOut } = NextAuth({
    // @ts-ignore
    adapter: PrismaAdapter(prisma),
    providers: [
        GitHub,
        Discord
    ],
});