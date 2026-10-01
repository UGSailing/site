import type { ApiTypes } from "@/prisma/apiclient";
import { client } from "@/prisma/apiclient";
import { BoardMemberPositionCreateSchema } from "@zenstackhq/runtime/zod/models";

import { createEndpoints, type CrudConfig } from "./crud-types";

export type MemberPositionAttributes = ApiTypes["BoardMemberPosition"]["attributes"];

export const memberPositionConfig: CrudConfig<MemberPositionAttributes> = {
    key: "memberposition",
    route: "boardMemberPosition",
    title: "Board Member Positions",
    singular: "Board Member Position",
    displayField: "positionId",
    displayItem: (item) => `Assignment #${item.id}`,
    schema: BoardMemberPositionCreateSchema,
    readonlyFields: ["createdAt", "updatedAt"],
    fields: {
        positionId: { label: "Position", type: "select" },
        boardMemberYearId: { label: "Board Member Year", type: "select" },
    },
    loadOptions: async () => {
        const [yearsRes, boardsRes, membersRes, positionsRes] = await Promise.all([
            client.GET("/api/model/rest/boardMemberYear", {}),
            client.GET("/api/model/rest/board", {}),
            client.GET("/api/model/rest/boardMember", {}),
            client.GET("/api/model/rest/position", {}),
        ]);
        const boardById = new Map((boardsRes.data?.data ?? []).map((b) => [b.id, b.attributes]));
        const memberById = new Map((membersRes.data?.data ?? []).map((m) => [m.id, m.attributes]));
        return {
            boardMemberYearId: (yearsRes.data?.data ?? []).map((y) => {
                const board = boardById.get(y.attributes.boardId as number);
                const member = memberById.get(y.attributes.boardMemberId as number);
                const label =
                    board && member
                        ? `${board.name} - ${member.name} (${board.year})`
                        : `Year #${y.id}`;
                return { label, value: y.id };
            }),
            positionId: (positionsRes.data?.data ?? []).map((p) => ({
                label: p.attributes.name,
                value: p.id,
            })),
        };
    },
    renderListItem: (item) => (
        <>
            <p>Position ID: {item.attributes.positionId}</p>
            <p>Board Member Year ID: {item.attributes.boardMemberYearId}</p>
        </>
    ),
};

export const memberPositionEndpoints = createEndpoints<MemberPositionAttributes>("boardMemberPosition");