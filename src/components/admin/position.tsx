import type { ApiTypes } from "@/prisma/apiclient";
import { PositionCreateSchema } from "@zenstackhq/runtime/zod/models";

import { createEndpoints, type CrudConfig } from "./crud-types";

export type PositionAttributes = ApiTypes["Position"]["attributes"];

export const positionConfig: CrudConfig<PositionAttributes> = {
    key: "position",
    route: "position",
    title: "Positions",
    singular: "Position",
    displayField: "name",
    schema: PositionCreateSchema,
    fields: {
        name: { label: "Name", placeholder: "Position Name", type: "text" },
        description: { label: "Description", placeholder: "Position Description", type: "text" },
        email: { label: "Email", placeholder: "Position Email", type: "text" },
        index: { label: "Index", placeholder: "Position Index", type: "number" },
    },
    renderListItem: (item) => (
        <>
            <p>{item.attributes.description}</p>
            <p>Email: {item.attributes.email}</p>
            <p>Index: {item.attributes.index}</p>
        </>
    ),
};

export const positionEndpoints = createEndpoints<PositionAttributes>("position");