import { cache } from 'react';
import prisma from '@/prisma';
import { auth } from '@/lib/auth';

const getUserWithRoles = cache(async () => {
    const session = await auth();
    if (!session?.user?.id) return null;
    return prisma.user.findUnique({
        where: { id: session.user.id },
        include: { roles: { include: { role: true } } },
    });
});

export type RoleGuardResult =
    | { status: 200; user: NonNullable<Awaited<ReturnType<typeof getUserWithRoles>>> }
    | { status: 401 }
    | { status: 403 };

export async function requireRole(roleIds: bigint[]): Promise<RoleGuardResult> {
    const user = await getUserWithRoles();
    if (!user) return { status: 401 };
    if (!user.roles.some((r) => roleIds.includes(r.roleId))) return { status: 403 };
    return { status: 200, user };
}