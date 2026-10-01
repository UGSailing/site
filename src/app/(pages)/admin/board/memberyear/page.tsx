"use server";

import MemberYearList from "@/components/admin/board/memberyear/list";
import { requireRole } from '@/lib/auth-helpers';
import { ROLES } from '@/lib/auth-types';
import { Http403 } from '@/components/http';

export default async function MemberYear() {
    const role = await requireRole(ROLES.TEAM)
    if (role.status == 403) {
        return <Http403/>
    }
    return (
        <div>
            <MemberYearList />
        </div>
    );
}
