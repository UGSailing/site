"use client";

import React from 'react';
import Form, { type SchemaInfo } from '@/components/form';
import { BoardMemberYearCreateSchema } from '@zenstackhq/runtime/zod/models';
import { useRouter } from 'next/navigation';
import { ApiTypes, client } from '@/prisma/apiclient';

type BoardMemberYear = ApiTypes["BoardMemberYear"];
type BoardMemberYearUpdate = ApiTypes["BoardMemberYearUpdateRequest"]["data"]["attributes"];

export default function BoardMemberYearUpdate({ boardMemberYearId }: { boardMemberYearId: string }) {
    const [boardMemberYear, setBoardMemberYear] = React.useState<BoardMemberYear | null | undefined>(null);
    const { push } = useRouter();

    async function loadForm(id: string) {
        const response = await client.GET("/api/model/rest/boardMemberYear/{id}", {
            params: {
                path: { id },
                query: {
                    include: "image",
                }
            }
        });
        if (response.response.status === 200) {
            const data: BoardMemberYear = { ...response.data!.data };
            setBoardMemberYear(data);
        } else {
            setBoardMemberYear(undefined);
        }
    }
    if (boardMemberYear === null)
        loadForm(boardMemberYearId);
    const fields: SchemaInfo["fields"] = {
        imageId: {
            label: "Image",
            placeholder: "Board Member Year Image ID",
            type: 'image',
        },
        boardMemberId: {
            label: "Board Member ID",
            placeholder: "Board Member ID",
            type: 'number',
        },
        boardId: {
            label: "Board ID",
            placeholder: "Board ID",
            type: 'number',
        },
        index: {
            label: "Index",
            placeholder: "Board Member Year Index",
            type: 'number',
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
        const attributes = data as BoardMemberYearUpdate;
        delete attributes.createdAt;
        delete attributes.updatedAt;

        const response = await client.PATCH("/api/model/rest/boardMemberYear/{id}", {
            params: {
                path: {
                    id: boardMemberYearId
                },
            },
            body: {
                data: {
                    type: "boardMemberYear",
                    id: Number(boardMemberYearId),
                    attributes: attributes
                }
            }
        })
        if (response.response.status === 200) {
            push(`/admin/board/memberyear/${boardMemberYearId}`);
        } else {
            const errors = response.error
            setErrors(errors as unknown as string);
        }
    };

    return (
        <div>
            {
                boardMemberYear === null ? (
                    <p>Loading...</p>
                ) : boardMemberYear === undefined ? (
                    <p>Event not found</p>
                ) : (
                    <Form schemaInfo={
                        {
                            schema: BoardMemberYearCreateSchema,
                            name: "board-member-year-update-form",
                            formProps: {
                                defaultValues: boardMemberYear.attributes
                            },
                            formTitle: "Board Member Year Info",

                            formDescription: "Here you can update board member year info.",
                            fields,
                            onSubmit
                        }
                    } />
                )
            }

        </div>
    );
}
