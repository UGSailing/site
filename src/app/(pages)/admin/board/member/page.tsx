"use server";

import MemberList from "@/components/admin/board/member/list";

export default async function Member() {
    return (
        <div>
            <MemberList />
        </div>
    );
}
