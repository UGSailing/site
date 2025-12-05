"use client";

import React from 'react';
import Form, { type SchemaInfo } from '@/components/form';
import { PartnerCreateSchema } from '@zenstackhq/runtime/zod/models';
import { useRouter } from 'next/navigation';
import { ApiTypes, client } from '@/prisma/apiclient';

type Partner = ApiTypes["Partner"]; 
type PartnerUpdate = ApiTypes["PartnerUpdateRequest"]["data"]["attributes"];

type ExtendedPartner = Partner & {
    attributes: Partner["attributes"] & {
        logo?: ApiTypes["Media"] | null;
    }
};

export default function PartnerUpdate({ partnerId }: { partnerId: string } ) {
    const [partner, setPartner] = React.useState<ExtendedPartner | null | undefined>(null);
    const { push } = useRouter();

    async function loadForm(id: string) {
        const response = await client.GET("/api/model/rest/partner/{id}", {
            params: {
                path: { id },
                query: {
                    include: "logo",
                }
            }
        });
        if (response.response.status === 200) {
            const data: ExtendedPartner = { ...response.data!.data };
            data.attributes.logo = (response.data!.included?.filter(a => a.type === "media")[0] as unknown as ApiTypes["Media"]) || null;
            setPartner(data);
        } else {
            setPartner(undefined);
        }
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
        logoId: {
            label: "Logo",
            placeholder: "Partner Logo URL",
            type: 'image',
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
        
        // Ensure URL starts with https
        if (attributes.url && !attributes.url.startsWith('http')) {
            attributes.url = `https://${attributes.url}`;
        }
        
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
            push(`/admin/partner/${partnerId}`);
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