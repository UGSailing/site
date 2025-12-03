"use client";

import React from 'react';
import Form, { type SchemaInfo } from '@/components/form';
import { PartnerCreateSchema } from '@zenstackhq/runtime/zod/models';
import { redirect } from 'next/navigation';
import { client, ApiTypes } from '@/prisma/apiclient';

type Partner = ApiTypes["Partner"]; 
type PartnerUpdate = ApiTypes["PartnerUpdateRequest"]["data"]["attributes"];

export default function PartnerUpdate({ partnerId }: { partnerId: string } ) {
    const [partner, setPartner] = React.useState<Partner | null | undefined>(null);

    async function loadForm(id: string) {
        const response = await client.GET("/api/model/rest/partner/{id}", {
            params: {
                path: { id }
            }
        });
        setPartner(response.response.status === 200 ? response.data!.data : undefined);
    }
    if (partner === null)
        loadForm(partnerId);

    const fields: SchemaInfo["fields"] = {
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
            placeholder: "Partner Description",
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
    const onSubmit: SchemaInfo["onSubmit"] = async (data, setErrors) => {
        const attributes = data as PartnerUpdate;
        delete attributes.createdAt;
        delete attributes.updatedAt;
        const response = await client.PATCH("/api/model/rest/partner/{id}", {
            params: { 
                path: { 
                    id: partnerId 
                },
            },
            body: {
                data: {
                    type: "partner",
                    id: Number(partnerId),
                    attributes: attributes
                }
            }
        })
        if (response.response.status === 200) {
            redirect(`/admin/partner/${partnerId}`);
        } else {
            const errors = response.error
            setErrors(errors as unknown as string);
        }
    };
    
    return (
        <div>
            {
                partner === null ? (
                    <p>Loading...</p>
                ) : partner === undefined ? (
                    <p>Partner not found</p>
                ) : (
                    <Form schemaInfo={
                        {
                            schema: PartnerCreateSchema,
                            name: "partner-update-form",
                            formProps: {
                                defaultValues: partner.attributes
                            },
                            formTitle: "Partner Info",
                            
                            formDescription: "Here you can update partner info.",
                            fields,
                            onSubmit
                        }
                    } />
                )
            }
            
        </div>
    );
}