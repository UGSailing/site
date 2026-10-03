import type { ApiTypes } from "@/prisma/apiclient";
import { NewsCreateSchema } from "@zenstackhq/runtime/zod/models";

import { createEndpoints, type CrudConfig } from "./crud-types";

export type NewsAttributes = ApiTypes["News"]["attributes"];

export const newsConfig: CrudConfig<NewsAttributes> = {
    key: "news",
    route: "news",
    title: "News",
    displayField: "title",
    schema: NewsCreateSchema,
    readonlyFields: ["createdAt", "updatedAt"],
    fields: {
        title: { label: "Title", placeholder: "News Title", type: "text" },
        link: { label: "Link", placeholder: "News Link URL", type: "text" },
    },
};

export const newsEndpoints = createEndpoints<NewsAttributes>("news");