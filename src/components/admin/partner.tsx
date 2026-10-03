import type { ApiTypes } from "@/prisma/apiclient";
import { PartnerType as PartnerEnum } from "@/prisma/apiclient";
import { PartnerCreateSchema } from "@zenstackhq/runtime/zod/models";
import { A } from "@/components";

import { createEndpoints, type CrudConfig } from "./crud-types";

export type PartnerAttributes = ApiTypes["Partner"]["attributes"] & {
    /** hoisted from ?include=logo by the factory */
    logo?: ApiTypes["Media"] | null;
};

export const partnerConfig: CrudConfig<PartnerAttributes> = {
    key: "partner",
    route: "partner",
    title: "Partners",
    singular: "Partner",
    displayField: "name",
    schema: PartnerCreateSchema,
    include: { query: "logo", type: "media" },
    readonlyFields: ["createdAt", "updatedAt"],
    fields: {
        name: { label: "Name", placeholder: "Partner Name", type: "text" },
        active: { label: "Active", type: "checkbox" },
        partnerType: {
            label: "Partner Type",
            type: "select",
            options: [
                { value: PartnerEnum.HEAD, label: "Head Partner" },
                { value: PartnerEnum.STRATEGIC, label: "Strategic Partner" },
                { value: PartnerEnum.COLLABORATIVE, label: "Collaborative Partner" },
            ],
        },
        url: { label: "Link to site", placeholder: "Partner Site URL", type: "text" },
        logoId: { label: "Logo", placeholder: "Partner Logo URL", type: "image" },
        description: { label: "Description", placeholder: "Partner Description", type: "textarea" },
    },
    transform: (attributes) => {
        const url = attributes.url as string | null;
        if (url && !url.startsWith("http")) attributes.url = `https://${url}`;
        return attributes;
    },
    imageFields: { logoId: "logo" },
    renderListItem: (partner) => (
        <>
            <p className={partner.attributes.active ? "text-green-700 font-bold" : "text-red-500 font-bold"}>
                {partner.attributes.active ? "Active Partner" : "Inactive Partner"}
            </p>
            <p>Partner type: {partner.attributes.partnerType}</p>
            {partner.attributes.url && <A href={partner.attributes.url}>Site</A>}
            <p>{partner.attributes.description}</p>
        </>
    ),
};

export const partnerEndpoints = createEndpoints<PartnerAttributes>("partner");