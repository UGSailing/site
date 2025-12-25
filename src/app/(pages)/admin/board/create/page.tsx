"use client";

import React from 'react';
import { BoardCreateSchema } from '@zenstackhq/runtime/zod/models';
import Form, { type SchemaInfo } from '@/components/form';
import { redirect } from 'next/navigation';
import { client, type ApiTypes } from '@/prisma/apiclient';

type BoardType = ApiTypes["BoardCreateRequest"]["data"]["attributes"];

export default function Board() {
    console.log('BoardCreateSchema:', BoardCreateSchema);
    const currentYear = new Date().getFullYear().toString();
    const schemaInfo: SchemaInfo = {
        schema: 
    BoardCreateSchema.superRefine((data, ctx) => {
        console.log('Validating data:', data);
    }),
        name: "board-create-form",
        formTitle: "Create new Board",
        onSubmit: async (data, setErrors) => {
            const attributes = data as BoardType;
            console.log(attributes);
            
            const response = await client.POST("/api/model/rest/board", {
                body: {
                    data: {
                        type: "board",
                        attributes: attributes
                    }
                }
            });
            console.log(response);
            if (response.response.status === 201) {
                redirect(`/admin/board/${response.data!.data.id}`);
            } else {
                const errors = response.error
                setErrors(errors as unknown as string);
            }
        },
        formDescription: "Here you can create a new board.",
        fields: {
            name: {
                label: "Name",
                placeholder: "Board Name",
                type: 'text',
            },
            year: {
                label: "Year",
                placeholder: "Board Year",
                type: 'number',
            },
        },
        formProps: {
            values: {
                year: parseInt(currentYear),
                name: `Crew ${currentYear}-${(parseInt(currentYear) + 1).toString()}`
            }
        }
    };
    
    return (
        <Form schemaInfo={schemaInfo} />
    );
}
