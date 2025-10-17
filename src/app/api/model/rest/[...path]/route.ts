import { enhance } from '@zenstackhq/runtime';
import { NextRequestHandler } from '@zenstackhq/server/next';
import { RestApiHandler } from "@zenstackhq/server/api";
import { prisma } from '@/prisma';

async function getPrisma() {
    return enhance(prisma, { });
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