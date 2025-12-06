"use client";

import React from 'react';
import Form, { type SchemaInfo } from '@/components/form';
import { EventCreateSchema } from '@zenstackhq/runtime/zod/models';
import { useRouter } from 'next/navigation';
import { ApiTypes, client } from '@/prisma/apiclient';

type Event = ApiTypes["Event"];
type EventUpdate = ApiTypes["EventUpdateRequest"]["data"]["attributes"];

type ExtendedEvent = Event & {
    attributes: Event["attributes"] & {
        image?: ApiTypes["Media"] | null;
    }
};

export default function EventUpdate({ eventId }: { eventId: string }) {
    const [event, setEvent] = React.useState<ExtendedEvent | null | undefined>(null);
    const { push } = useRouter();

    async function loadForm(id: string) {
        const response = await client.GET("/api/model/rest/event/{id}", {
            params: {
                path: { id },
                query: {
                    include: "image",
                }
            }
        });
        if (response.response.status === 200) {
            const data: ExtendedEvent = { ...response.data!.data };
            data.attributes.image = (response.data!.included?.filter((a: Record<string, unknown>) => a.type === "media")[0] as unknown as ApiTypes["Media"]) || null;
            setEvent(data);
        } else {
            setEvent(undefined);
        }
    }
    if (event === null)
        loadForm(eventId);
    const fields: SchemaInfo["fields"] = {
        title: {
            label: "Title",
            placeholder: "Event Title",
            type: 'text',
        },
        startDate: {
            label: "Start Date",
            type: 'datetime',
        },
        endDate: {
            label: "End Date",
            type: 'datetime',
        },
        location: {
            label: "Location",
            placeholder: "Event Location",
            type: 'text',
        },
        intro: {
            label: "Introduction",
            placeholder: "Event Introduction",
            type: 'textarea',
        },

        imageId: {
            label: "Event Image",
            placeholder: "Event Image URL",
            type: 'image',
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
        const attributes = data as EventUpdate;
        delete attributes.createdAt;
        delete attributes.updatedAt;

        const response = await client.PATCH("/api/model/rest/event/{id}", {
            params: {
                path: {
                    id: eventId
                },
            },
            body: {
                data: {
                    type: "event",
                    id: Number(eventId),
                    attributes: attributes
                }
            }
        })
        if (response.response.status === 200) {
            push(`/admin/event/${eventId}`);
        } else {
            const errors = response.error
            setErrors(errors as unknown as string);
        }
    };

    return (
        <div>
            {
                event === null ? (
                    <p>Loading...</p>
                ) : event === undefined ? (
                    <p>Event not found</p>
                ) : (
                    <Form schemaInfo={
                        {
                            schema: EventCreateSchema,
                            name: "event-update-form",
                            formProps: {
                                defaultValues: event.attributes
                            },
                            formTitle: "Event Info",

                            formDescription: "Here you can update event info.",
                            fields,
                            onSubmit
                        }
                    } />
                )
            }

        </div>
    );
}
