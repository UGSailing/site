"use client";

import React from 'react';
import { PositionCreateSchema } from '@zenstackhq/runtime/zod/models';
import Form, { type SchemaInfo } from '@/components/form';
import { redirect } from 'next/navigation';
import { client, type ApiTypes } from '@/prisma/apiclient';

type PositionType = ApiTypes["PositionCreateRequest"]["data"]["attributes"];

export default function Position() {
    console.log('PositionCreateSchema:', PositionCreateSchema);
    const currentYear = new Date().getFullYear().toString();
    const schemaInfo: SchemaInfo = {
        schema: 
    PositionCreateSchema.superRefine((data, ctx) => {
        console.log('Validating data:', data);
    }),
        name: "board-create-form",
        formTitle: "Create new Board",
        onSubmit: async (data, setErrors) => {
            const attributes = data as PositionType;
            console.log(attributes);
            
            const response = await client.POST("/api/model/rest/position", {
                body: {
                    data: {
                        type: "position",
                        attributes: attributes
                    }
                }
            });
            console.log(response);
            if (response.response.status === 201) {
                redirect(`/admin/position/${response.data!.data.id}`);
            } else {
                const errors = response.error
                setErrors(errors as unknown as string);
            }
        },
        formDescription: "Here you can create a new position.",
        fields: {
            name: {
                label: "Name",
                placeholder: "Position Name",
                type: 'text',
            },
            description: {
                label: "Description",
                placeholder: "Position Description",
                type: 'text',
            },
            email: {
                label: "Email",
                placeholder: "Position Email",
                type: 'text',
            },
            index: {
                label: "Index",
                placeholder: "Position Index",
                type: 'number',
            }
        },
    };
    
    return (
        <Form schemaInfo={schemaInfo} />
    );
}
