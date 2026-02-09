"use client";

import React from 'react';
import { BoardMemberCreateSchema } from '@zenstackhq/runtime/zod/models';
import Form, { type SchemaInfo } from '@/components/form';
import { redirect } from 'next/navigation';
import { client, type ApiTypes } from '@/prisma/apiclient';

type MemberType = ApiTypes["BoardMemberCreateRequest"]["data"]["attributes"];

export default function Member() {
    console.log('BoardMemberCreateSchema:', BoardMemberCreateSchema);
    const currentYear = new Date().getFullYear().toString();
    const schemaInfo: SchemaInfo = {
        schema: 
    BoardMemberCreateSchema.superRefine((data, ctx) => {
        console.log('Validating data:', data);
    }),
        name: "board-member-create-form",
        formTitle: "Create new Member",
        onSubmit: async (data, setErrors) => {
            const attributes = data as MemberType;
            console.log(attributes);
            
            const response = await client.POST("/api/model/rest/boardMember", {
                body: {
                    data: {
                        type: "boardMember",
                        attributes: attributes
                    }
                }
            });
            console.log(response);
            if (response.response.status === 201) {
                redirect(`/admin/board/member/${response.data!.data.id}`);
            } else {
                const errors = response.error
                setErrors(errors as unknown as string);
            }
        },
        formDescription: "Here you can create a new member.",
        fields: {
            name: {
                label: "Name",
                placeholder: "Member Name",
                type: 'text',
            }
        },
    };
    
    return (
        <Form schemaInfo={schemaInfo} />
    );
}
