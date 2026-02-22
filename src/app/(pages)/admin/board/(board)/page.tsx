"use server";

import BoardList from "@/components/admin/board/list";

export default async function Board() {
    return (
        <div>
            <BoardList />
        </div>
    );
}
