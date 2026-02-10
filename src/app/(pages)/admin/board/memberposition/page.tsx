"use server";

import BoardMemberPositionList from "@/components/admin/board/memberposition/list";
import { getPrisma } from '@/lib/auth';

export default async function BoardMemberPosition() {
    return (
        <div>
            <BoardMemberPositionList />
        </div>
    );
}
