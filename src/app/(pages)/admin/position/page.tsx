"use server";

import PositionList from "@/components/admin/board/position/list";

export default async function Board() {
    return (
        <div>
            <PositionList />
        </div>
    );
}
