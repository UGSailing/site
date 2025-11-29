"use client";

import Form, { type SchemaInfo } from '@/components/form';
import { PartnerCreateSchema } from '@zenstackhq/runtime/zod/models';
import { redirect } from 'next/navigation';
import { client, ApiTypes } from '@/prisma/apiclient';

type Partner = ApiTypes["Partner"]; 

export default function PartnerUpdate({ partner }: { partner: Partner } ) {
    console.log(partner);
    const schemaInfo: SchemaInfo = {
        schema: PartnerCreateSchema,
        name: "partner-update-form",
        formProps: {
            defaultValues: partner.attributes
        },
        formTitle: "Partner Info",
        onSubmit: async (data, setErrors) => {
            delete data.createdAt;
            delete data.updatedAt;
            const response = await client.PATCH("/api/model/rest/partner/{id}", {
                params: { 
                    path: { 
                        id: partner.id.toString() 
                    },
                },
                body: {
                    data: {
                        type: "partner",
                        id: partner.id,
                        attributes: data
                    }
                }
            })
            if (response.response.status === 200) {
                redirect(`/admin/partner/${partner.id}`);
            } else {
                setErrors(response.error as any);
            }
        },
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
            <Form schemaInfo={schemaInfo} />
        </div>
    );
}