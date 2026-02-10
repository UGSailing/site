"use client";

import React from 'react';
import { BoardMemberYearCreateSchema } from '@zenstackhq/runtime/zod/models';
import Form, { type SchemaInfo } from '@/components/form';
import { redirect } from 'next/navigation';
import { client, type ApiTypes } from '@/prisma/apiclient';

type MemberYearType = ApiTypes["BoardMemberYearCreateRequest"]["data"]["attributes"];
type Option = {
    label: string;
    value: number;
}

export default function MemberYear({ boardMembers, boards }: { boardMembers: Option[]; boards: Option[] }) {
    console.log('BoardMemberYearCreateSchema:', BoardMemberYearCreateSchema);
    const schemaInfo: SchemaInfo = {
        schema: 
    BoardMemberYearCreateSchema.superRefine((data, ctx) => {
        console.log('Validating data:', data);
    }),
        name: "board-member-create-form",
        formTitle: "Create new Member Year",
        onSubmit: async (data, setErrors) => {
            const attributes = data as MemberYearType;
            console.log(attributes);
            
            const response = await client.POST("/api/model/rest/boardMemberYear", {
                body: {
                    data: {
                        type: "boardMemberYear",
                        attributes: attributes
                    }
                }
            });
            console.log(response);
            if (response.response.status === 201) {
                redirect(`/admin/board/memberyear/${response.data!.data.id}`);
            } else {
                const errors = response.error
                setErrors(errors as unknown as string);
            }
        },
        formDescription: "Here you can create a new member year.",
        fields: {
            imageId: {
                label: "Image",
                placeholder: "Board Member Year Image ID",
                type: 'image',
            },
            boardMemberId: {
                label: "Board Member",
                type: 'select',
                options: boardMembers
            },
            boardId: {
                label: "Board",
                type: 'select',
                options: boards
            },
            index: {
                label: "Index",
                placeholder: "Board Member Year Index",
                type: 'number',
            },
        },
    };
    
    return (
        <Form schemaInfo={schemaInfo} />
    );
}
