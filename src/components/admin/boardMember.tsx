import type { ApiTypes } from "@/prisma/apiclient";
import { BoardMemberCreateSchema } from "@zenstackhq/runtime/zod/models";

import { createEndpoints, type CrudConfig } from "./crud-types";

export type MemberAttributes = ApiTypes["BoardMember"]["attributes"];

export const memberConfig: CrudConfig<MemberAttributes> = {
    key: "member",
    route: "boardMember", // REST route and prisma delegate differ from the URL key
    title: "Members",
    singular: "Member",
    displayField: "name",
    schema: BoardMemberCreateSchema,
    fields: {
        name: { label: "Name", placeholder: "Member Name", type: "text" },
    },
};

export const memberEndpoints = createEndpoints<MemberAttributes>("boardMember");