// Target path in repo: src/components/zenstack/event.tsx
//
// Per-entity layer for the CRUD factory: everything that makes Event
// different from Partner/Member/... lives here. Nothing else in the
// admin section should mention "event".

import type { ApiTypes } from "@/prisma/apiclient";
import { EventCreateSchema } from "@zenstackhq/runtime/zod/models";

import { createEndpoints, type CrudConfig, type CrudEndpoints } from "./crud-types";

export type EventAttributes = ApiTypes["Event"]["attributes"] & {
    /** hoisted from ?include=image by the factory */
    image?: ApiTypes["Media"] | null;
};

export const eventConfig: CrudConfig<EventAttributes> = {
    key: "event",
    route: "event",
    title: "Events",
    singular: "Event",
    displayField: "title",
    schema: EventCreateSchema,
    include: { query: "image", type: "media" },
    readonlyFields: ["createdAt", "updatedAt"],
    fields: {
        title: { label: "Title", placeholder: "Event Title", type: "text" },
        startDate: { label: "Start Date", type: "datetime" },
        endDate: { label: "End Date", type: "datetime" },
        location: {label: "Location", placeholder: "Event Location", type: "text" },
        intro: { label: "Introduction", placeholder: "Event Introduction", type: "textarea" },
        imageId: { label: "Event Image", placeholder: "Event Image URL", type: "image" },
    },
    imageFields: { imageId: "image" },
    renderListItem: (event) => {
        const attrs = event.attributes;
        const future = Date.parse(String(attrs.startDate)) > Date.now();
        return (
            <>
                <p className={future ? "text-green-700 font-bold" : "text-red-500 font-bold"}>
                    {future ? "Future Event" : "Passed Event"}
                </p>
                <p>{attrs.location}</p>
                <p>{attrs.intro}</p>
                <p>
                    {String(attrs.startDate)} — {String(attrs.endDate)}
                </p>
            </>
        );
    },
};

export const eventEndpoints = createEndpoints<EventAttributes>("event");