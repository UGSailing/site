"use server";

import MemberList from "@/components/admin/board/member/list";
import { requireRole } from '@/lib/auth-helpers';
import { ROLES } from '@/lib/auth-types';
import { Http403 } from '@/components/http';

export default async function Member() {
    const role = await requireRole(ROLES.TEAM)
    if (role.status == 403) {
        return <Http403/>
    }
    return (
        <div>
            <MemberList />
        </div>
    );
}
