"use client";

import React from 'react';
import Form, { type SchemaInfo } from '@/components/form';
import { BoardMemberCreateSchema } from '@zenstackhq/runtime/zod/models';
import { useRouter } from 'next/navigation';
import { ApiTypes, client } from '@/prisma/apiclient';

type Member = ApiTypes["BoardMember"];
type MemberUpdate = ApiTypes["BoardMemberUpdateRequest"]["data"]["attributes"];

export default function MemberUpdate({ memberId }: { memberId: string }) {
    const [member, setMember] = React.useState<Member | null | undefined>(null);
    const { push } = useRouter();

    async function loadForm(id: string) {
        const response = await client.GET("/api/model/rest/boardMember/{id}", {
            params: {
                path: { id },
            }
        });
        if (response.response.status === 200) {
            const data: Member = { ...response.data!.data };
            setMember(data);
        } else {
            setMember(undefined);
        }
    }
    if (member === null)
        loadForm(memberId);
    const fields: SchemaInfo["fields"] = {
        name: {
            label: "Name",
            placeholder: "Member Name",
            type: 'text',
        },
    }
    const onSubmit: SchemaInfo["onSubmit"] = async (data, setErrors) => {
        const attributes = data as MemberUpdate;
        delete attributes.createdAt;
        delete attributes.updatedAt;

        const response = await client.PATCH("/api/model/rest/boardMember/{id}", {
            params: {
                path: {
                    id: memberId
                },
            },
            body: {
                data: {
                    type: "boardMember",
                    id: Number(memberId),
                    attributes: attributes
                }
            }
        })
        if (response.response.status === 200) {
            push(`/admin/board/member/${memberId}`);
        } else {
            const errors = response.error
            setErrors(errors as unknown as string);
        }
    };

    return (
        <div>
            {
                member === null ? (
                    <p>Loading...</p>
                ) : member === undefined ? (
                    <p>Member not found</p>
                ) : (
                    <Form schemaInfo={
                        {
                            schema: BoardMemberCreateSchema,
                            name: "member-update-form",
                            formProps: {
                                defaultValues: member.attributes
                            },
                            formTitle: "Member Info",

                            formDescription: "Here you can update member info.",
                            fields,
                            onSubmit
                        }
                    } />
                )
            }

        </div>
    );
}
