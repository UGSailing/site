"use client";

import React from 'react';
import { BoardMemberPositionCreateSchema } from '@zenstackhq/runtime/zod/models';
import Form, { type SchemaInfo } from '@/components/form';
import { redirect } from 'next/navigation';
import { client, type ApiTypes } from '@/prisma/apiclient';

type MemberType = ApiTypes["BoardMemberPositionCreateRequest"]["data"]["attributes"];
type Option = {
    label: string;
    value: number;
}

export default function Member({ boardMemberYears, positions }: { boardMemberYears: Option[]; positions: Option[] }) {
    console.log('BoardMemberPositionCreateSchema:', BoardMemberPositionCreateSchema);
    const currentYear = new Date().getFullYear().toString();
    const schemaInfo: SchemaInfo = {
        schema: 
    BoardMemberPositionCreateSchema.superRefine((data, ctx) => {
        console.log('Validating data:', data);
    }),
        name: "board-member-position-create-form",
        formTitle: "Create new Member Position",
        onSubmit: async (data, setErrors) => {
            const attributes = data as MemberType;
            console.log(attributes);
            
            const response = await client.POST("/api/model/rest/boardMemberPosition", {
                body: {
                    data: {
                        type: "boardMemberPosition",
                        attributes: attributes
                    }
                }
            });
            console.log(response);
            if (response.response.status === 201) {
                redirect(`/admin/board/memberposition/${response.data!.data.id}`);
            } else {
                const errors = response.error
                setErrors(errors as unknown as string);
            }
        },
        formDescription: "Here you can create a new member position.",
        fields: {
            positionId: {
                label: "Position",
                type: 'select',
                options: positions,
            },
            boardMemberYearId: {
                label: "Board Member Year",
                type: 'select',
                options: boardMemberYears,
            },
        },
    };
    
    return (
        <Form schemaInfo={schemaInfo} />
    );
}
