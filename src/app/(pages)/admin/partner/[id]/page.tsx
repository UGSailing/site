"use server";

import React from 'react';
import { client, paths } from '@/prisma';
import PartnerList from "@/components/admin/partner/list";
import { PartnerCreateSchema } from '@zenstackhq/runtime/zod/models';
import Form, { type SchemaInfo } from '@/components/form';

type Partner = paths["/api/model/rest/partner"]["get"]["responses"][200]["content"]["application/vnd.api+json"]["data"][0];

export default async function Partner({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const response = await client.GET("/api/model/rest/partner/{id}", {
        params: {
            path: { id }
        }
    })
    const partner = response.response.status === 200 ? response.data!.data : null;
    console.log(partner);
    const schemaInfo: SchemaInfo = {
        schema: PartnerCreateSchema,
        name: "partner-create-form",
        props: {
            defaultValues: partner
        },
        formTitle: "Create new Partner",
        endpoint: '/api/model/rest/partner',
        formDescription: "Here you can create a new partner.",
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
            }
        }
    };
    return (
        <div>
            <Form {...schemaInfo} />
        </div>
    );
}
