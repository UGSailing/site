"use client";

import React from 'react';
import Form, { type SchemaInfo } from '@/components/form';
import { PositionCreateSchema } from '@zenstackhq/runtime/zod/models';
import { useRouter } from 'next/navigation';
import { ApiTypes, client } from '@/prisma/apiclient';

type Position = ApiTypes["Position"];
type PositionUpdate = ApiTypes["PositionUpdateRequest"]["data"]["attributes"];

export default function PositionUpdate({ positionId }: { positionId: string }) {
    const [position, setPosition] = React.useState<Position | null | undefined>(null);
    const { push } = useRouter();

    async function loadForm(id: string) {
        const response = await client.GET("/api/model/rest/position/{id}", {
            params: {
                path: { id },
                query: {
                    include: "image",
                }
            }
        });
        if (response.response.status === 200) {
            const data: Position = { ...response.data!.data };
            setPosition(data);
        } else {
            setPosition(undefined);
        }
    }
    if (position === null)
        loadForm(positionId);
    const fields: SchemaInfo["fields"] = {
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
    }
    const onSubmit: SchemaInfo["onSubmit"] = async (data, setErrors) => {
        const attributes = data as PositionUpdate;
        delete attributes.createdAt;
        delete attributes.updatedAt;

        const response = await client.PATCH("/api/model/rest/position/{id}", {
            params: {
                path: {
                    id: positionId
                },
            },
            body: {
                data: {
                    type: "position",
                    id: Number(positionId),
                    attributes: attributes
                }
            }
        })
        if (response.response.status === 200) {
            push(`/admin/position/${positionId}`);
        } else {
            const errors = response.error
            setErrors(errors as unknown as string);
        }
    };

    return (
        <div>
            {
                position === null ? (
                    <p>Loading...</p>
                ) : position === undefined ? (
                    <p>Position not found</p>
                ) : (
                    <Form schemaInfo={
                        {
                            schema: PositionCreateSchema,
                            name: "position-update-form",
                            formProps: {
                                defaultValues: position.attributes
                            },
                            formTitle: "Position Info",

                            formDescription: "Here you can update position info.",
                            fields,
                            onSubmit
                        }
                    } />
                )
            }

        </div>
    );
}
