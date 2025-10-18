import { enhance } from '@zenstackhq/runtime';
import { NextRequestHandler } from '@zenstackhq/server/next';
import { RestApiHandler } from "@zenstackhq/server/api";
import prisma from '@/prisma';
import { auth } from '@/lib/auth';

async function getPrisma() {
    const session = await auth();
    if (session?.user) {
        const user = await prisma.user.findUniqueOrThrow({
            where: { id: session.user.id },
        });
        return enhance(prisma, { user });
    } else {
        // anonymous user
        return enhance(prisma);
    }
}

const handler = NextRequestHandler({ getPrisma, useAppDir: true, handler: RestApiHandler({
    endpoint: process.env.NODE_ENV == "development" ? 'http://localhost:3000/api/model/rest' : 'https://ugentsailing.be/api/model/rest',
}) });

export {
    handler as DELETE,
    handler as GET,
    handler as PATCH,
    handler as POST,
    handler as PUT
};