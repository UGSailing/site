"use client";

import { paths } from "@/prisma/apiclient";
import Form, { type SchemaInfo } from '@/components/form';
import { PartnerCreateSchema } from '@zenstackhq/runtime/zod/models';

type Partner = paths["/api/model/rest/partner"]["get"]["responses"][200]["content"]["application/vnd.api+json"]["data"][0];

export default function PartnerUpdate({ partner }: { partner: Partner } ) {
    console.log(partner);
    const schemaInfo: SchemaInfo = {
        schema: PartnerCreateSchema,
        name: "partner-update-form",
        formProps: {
            defaultValues: partner.attributes
        },
        formTitle: "Partner Info",
        endpoint: `/api/model/rest/partner/${partner.id}`,
        formDescription: "Here you can update partner info.",
        fields: {
            name: {
                label: "Name",
                placeholder: "Partner Name",
                type: 'text',
            },
            active: {
                label: "Active",
                type: 'checkbox',
            },
            url: {
                label: "Link to site",
                placeholder: "Partner Site URL",
                type: 'text',
            },
            logo: {
                label: "Logo",
                placeholder: "Partner Logo URL",
                type: 'text',
            },
            description: {
                label: "Description",
                placeholder: "Event Description",
                type: 'textarea',
            },
            createdAt: {
                label: "Created At",
                type: "text",
                fieldProps: {
                    disabled: true
                }
            },
            updatedAt: {
                label: "Last Updated At",
                type: "text",
                fieldProps: {
                    disabled: true
                }
            }
        }
    };
    return (
        <div>
            <Form {...schemaInfo} />
        </div>
    );
}