"use client";

import React from 'react';
import { NewsCreateSchema } from '@zenstackhq/runtime/zod/models';
import Form, { type SchemaInfo } from '@/components/form';
import { redirect } from 'next/navigation';
import { client, type ApiTypes } from '@/prisma/apiclient';

type NewsType = ApiTypes["NewsCreateRequest"]["data"]["attributes"];

export default function News() {
    const schemaInfo: SchemaInfo = {
        schema: NewsCreateSchema,
        name: "news-create-form",
        formTitle: "Create new News",
        onSubmit: async (data, setErrors) => {
            const attributes = data as NewsType;

            const response = await client.POST("/api/model/rest/news", {
                body: {
                    data: {
                        type: "news",
                        attributes: attributes
                    }
                }
            });
            console.log(response);
            if (response.response.status === 201) {
                redirect(`/admin/news/${response.data!.data.id}`);
            } else {
                const errors = response.error
                setErrors(errors as unknown as string);
            }
        },
        formDescription: "Here you can create a new event.",
        fields: {
            title: {
                label: "Title",
                placeholder: "News Title",
                type: 'text',
            },
            link: {
                label: "Link",
                placeholder: "News Link URL",
                type: 'text',
            },
        }
    };

    return (
        <Form schemaInfo={schemaInfo} />
    );
}
