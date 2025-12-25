"use client";

import React from 'react';
import Form, { type SchemaInfo } from '@/components/form';
import { BoardCreateSchema } from '@zenstackhq/runtime/zod/models';
import { useRouter } from 'next/navigation';
import { ApiTypes, client } from '@/prisma/apiclient';

type Board = ApiTypes["Board"];
type BoardUpdate = ApiTypes["BoardUpdateRequest"]["data"]["attributes"];

export default function BoardUpdate({ boardId }: { boardId: string }) {
    const [board, setBoard] = React.useState<Board | null | undefined>(null);
    const { push } = useRouter();

    async function loadForm(id: string) {
        const response = await client.GET("/api/model/rest/board/{id}", {
            params: {
                path: { id },
            }
        });
        if (response.response.status === 200) {
            const data: Board = { ...response.data!.data };
            setBoard(data);
        } else {
            setBoard(undefined);
        }
    }
    if (board === null)
        loadForm(boardId);
    const fields: SchemaInfo["fields"] = {
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
        const attributes = data as BoardUpdate;
        delete attributes.createdAt;
        delete attributes.updatedAt;

        const response = await client.PATCH("/api/model/rest/board/{id}", {
            params: {
                path: {
                    id: boardId
                },
            },
            body: {
                data: {
                    type: "board",
                    id: Number(boardId),
                    attributes: attributes
                }
            }
        })
        if (response.response.status === 200) {
            push(`/admin/board/${boardId}`);
        } else {
            const errors = response.error
            setErrors(errors as unknown as string);
        }
    };

    return (
        <div>
            {
                board === null ? (
                    <p>Loading...</p>
                ) : board === undefined ? (
                    <p>Board not found</p>
                ) : (
                    <Form schemaInfo={
                        {
                            schema: BoardCreateSchema,
                            name: "board-update-form",
                            formProps: {
                                defaultValues: board.attributes
                            },
                            formTitle: "Board Info",
                            formDescription: "Here you can update board info.",
                            fields,
                            onSubmit
                        }
                    } />
                )
            }

        </div>
    );
}
