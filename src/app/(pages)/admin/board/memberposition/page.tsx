"use server";

import BoardMemberPositionList from "@/components/admin/board/memberposition/list";
import { getPrisma } from '@/lib/auth';
import { requireRole } from '@/lib/auth-helpers';
import { ROLES } from '@/lib/auth-types';
import { Http403 } from '@/components/http';

export default async function BoardMemberPosition() {
    const role = await requireRole(ROLES.TEAM)
    if (role.status == 403) {
        return <Http403/>
    }
    return (
        <div>
            <BoardMemberPositionList />
        </div>
    );
}
