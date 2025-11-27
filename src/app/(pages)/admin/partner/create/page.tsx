"use client";

import React from 'react';
import { PartnerCreateSchema } from '@zenstackhq/runtime/zod/models';
import Form, { type SchemaInfo } from '@/components/form';

export default function Partner() {
    const schemaInfo: SchemaInfo = {
        schema: PartnerCreateSchema,
        name: "partner-create-form",
        formTitle: "Create new Partner",
        endpoint: '/api/model/rest/partner',
        formDescription: "Here you can create a new partner.",
        fields: {
            name: {
                label: "Name",
                placeholder: "Partner Name",
                type: 'text',
            },
            active: {
                label: "Active",
                type: 'checkbox',
            },
            url: {
                label: "Link to site",
                placeholder: "Partner Site URL",
                type: 'text',
            },
            logo: {
                label: "Logo",
                placeholder: "Partner Logo URL",
                type: 'text',
            },
            description: {
                label: "Description",
                placeholder: "Event Description",
                type: 'textarea',
            },
        }
    };
    
    return (
        <Form {...schemaInfo} />
    );
}
