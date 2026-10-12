import type { ApiTypes } from "@/prisma/apiclient";
import { BoardCreateSchema } from "@zenstackhq/runtime/zod/models";

import { createEndpoints, type CrudConfig } from "./crud-types";

export type BoardAttributes = ApiTypes["Board"]["attributes"];

export const boardConfig: CrudConfig<BoardAttributes> = {
    key: "board",
    route: "board",
    title: "Boards",
    singular: "Board",
    displayField: "name",
    schema: BoardCreateSchema,
    readonlyFields: ["createdAt", "updatedAt"],
    fields: {
        name: { label: "Name", placeholder: "Board Name", type: "text" },
        year: { label: "Year", placeholder: "Board Year", type: "number" },
    },
};

export const boardEndpoints = createEndpoints<BoardAttributes>("board");