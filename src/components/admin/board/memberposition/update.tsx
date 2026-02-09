"use client";

import React from 'react';
import Form, { type SchemaInfo } from '@/components/form';
import { BoardMemberPositionCreateSchema } from '@zenstackhq/runtime/zod/models';
import { useRouter } from 'next/navigation';
import { ApiTypes, client } from '@/prisma/apiclient';

type BoardMemberPosition = ApiTypes["BoardMemberPosition"];
type BoardMemberPositionUpdate = ApiTypes["BoardMemberPositionUpdateRequest"]["data"]["attributes"];

export default function BoardMemberPositionUpdate({ boardMemberPositionId }: { boardMemberPositionId: string }) {
    const [boardMemberPosition, setBoardMemberPosition] = React.useState<BoardMemberPosition | null | undefined>(null);
    const { push } = useRouter();

    async function loadForm(id: string) {
        const response = await client.GET("/api/model/rest/boardMemberPosition/{id}", {
            params: {
                path: { id }
            }
        });
        if (response.response.status === 200) {
            const data: BoardMemberPosition = { ...response.data!.data };
            setBoardMemberPosition(data);
        } else {
            setBoardMemberPosition(undefined);
        }
    }
    if (boardMemberPosition === null)
        loadForm(boardMemberPositionId);
    const fields: SchemaInfo["fields"] = {
        positionId: {
            label: "Position ID",
            placeholder: "Position ID",
            type: 'number',
        },
        boardMemberYearId: {
            label: "Board Member Year ID",
            placeholder: "Board Member Year ID",
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
        const attributes = data as BoardMemberPositionUpdate;
        delete attributes.createdAt;
        delete attributes.updatedAt;

        const response = await client.PATCH("/api/model/rest/boardMemberPosition/{id}", {
            params: {
                path: {
                    id: boardMemberPositionId
                },
            },
            body: {
                data: {
                    type: "boardMemberPosition",
                    id: Number(boardMemberPositionId),
                    attributes: attributes
                }
            }
        })
        if (response.response.status === 200) {
            push(`/admin/board/memberposition/${boardMemberPositionId}`);
        } else {
            const errors = response.error
            setErrors(errors as unknown as string);
        }
    };

    return (
        <div>
            {
                boardMemberPosition === null ? (
                    <p>Loading...</p>
                ) : boardMemberPosition === undefined ? (
                    <p>Position not found</p>
                ) : (
                    <Form schemaInfo={
                        {
                            schema: BoardMemberPositionCreateSchema,
                            name: "board-member-position-update-form",
                            formProps: {
                                defaultValues: boardMemberPosition.attributes
                            },
                            formTitle: "Board Member Position Info",

                            formDescription: "Here you can update board member position info.",
                            fields,
                            onSubmit
                        }
                    } />
                )
            }

        </div>
    );
}
