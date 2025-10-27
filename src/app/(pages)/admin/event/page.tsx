"use client";

import React from 'react';
import { EventCreateSchema } from '@zenstackhq/runtime/zod/models';
import Form, { type SchemaInfo } from '@/components/form';

const schemaInfo: SchemaInfo = {
    schema: EventCreateSchema,
    name: "event",
    formTitle: "Create new Event",
    endpoint: '/api/model/rest/event',
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
            label: "Intro",
            placeholder: "Event Intro",
            type: 'text',
        },
        description: {
            label: "Description",
            placeholder: "Event Description",
            type: 'textarea',
        },
        registration: {
            label: "Registration",
            placeholder: "Event Registration",
            type: 'number',
        },
    }
};

export default function Event() {
    return (
        <Form {...schemaInfo} />
    );
}
