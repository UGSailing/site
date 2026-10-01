import Link from "next/link";
import type { ApiTypes } from "@/prisma/apiclient";
import { client } from "@/prisma/apiclient";
import { BoardMemberYearCreateSchema } from "@zenstackhq/runtime/zod/models";

import { createEndpoints, type CrudConfig } from "./crud-types";

export type MemberYearAttributes = ApiTypes["BoardMemberYear"]["attributes"];

export const memberYearConfig: CrudConfig<MemberYearAttributes> = {
    key: "memberyear",
    route: "boardMemberYear",
    title: "Board Members",
    singular: "Board Member Year",
    displayField: "index",
    displayItem: (item) => `Board Member Year #${item.id}`,
    schema: BoardMemberYearCreateSchema,
    readonlyFields: ["createdAt", "updatedAt"],
    fields: {
        imageId: { label: "Image", placeholder: "Board Member Year Image ID", type: "image" },
        boardMemberId: { label: "Board Member", type: "select" },
        boardId: { label: "Board", type: "select" },
        index: { label: "Index", placeholder: "Board Member Year Index", type: "number" },
    },
    loadOptions: async () => {
        const [membersRes, boardsRes] = await Promise.all([
            client.GET("/api/model/rest/boardMember", {}),
            client.GET("/api/model/rest/board", {}),
        ]);
        return {
            boardMemberId: (membersRes.data?.data ?? []).map((m) => ({
                label: m.attributes.name,
                value: m.id,
            })),
            boardId: (boardsRes.data?.data ?? []).map((b) => ({
                label: b.attributes.name,
                value: b.id,
            })),
        };
    },
    renderListItem: (item) => (
        <>
            <p>
                Member:{" "}
                <Link href={`/admin/models/member/${item.attributes.boardMemberId}`}>
                    {item.attributes.boardMemberId}
                </Link>
            </p>
            <p>
                Board:{" "}
                <Link href={`/admin/models/board/${item.attributes.boardId}`}>
                    {item.attributes.boardId}
                </Link>
            </p>
            <p>
                Image: <a href={`/uploads/${item.attributes.imageId}`}>{item.attributes.imageId}</a>
            </p>
            <p>Index: {item.attributes.index}</p>
        </>
    ),
};

export const memberYearEndpoints = createEndpoints<MemberYearAttributes>("boardMemberYear");