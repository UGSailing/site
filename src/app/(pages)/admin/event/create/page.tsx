"use client";

import React from 'react';
import { EventCreateSchema } from '@zenstackhq/runtime/zod/models';
import Form, { type SchemaInfo } from '@/components/form';
import { redirect } from 'next/navigation';
import { client, type ApiTypes } from '@/prisma/apiclient';
import { requireRole } from '@/lib/auth-helpers';
import { ROLES } from '@/lib/auth-types';
import { Http403 } from '@/components/http';

type EventType = ApiTypes["EventCreateRequest"]["data"]["attributes"];

export default async function Event() {
    const role = await requireRole(ROLES.TEAM)
    if (role.status == 403) {
        return <Http403/>
    }
    const schemaInfo: SchemaInfo = {
        schema: EventCreateSchema,
        name: "event-create-form",
        formTitle: "Create new Event",
        onSubmit: async (data, setErrors) => {
            const attributes = data as EventType;
            
            const response = await client.POST("/api/model/rest/event", {
                body: {
                    data: {
                        type: "event",
                        attributes: attributes
                    }
                }
            });
            console.log(response);
            if (response.response.status === 201) {
                redirect(`/admin/event/${response.data!.data.id}`);
            } else {
                const errors = response.error
                setErrors(errors as unknown as string);
            }
        },
        formDescription: "Here you can create a new event.",
        fields: {
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
            }
        }
    };
    
    return (
        <Form schemaInfo={schemaInfo} />
    );
}
