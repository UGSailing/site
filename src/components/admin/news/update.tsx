"use client";

import React from 'react';
import Form, { type SchemaInfo } from '@/components/form';
import { NewsCreateSchema } from '@zenstackhq/runtime/zod/models';
import { useRouter } from 'next/navigation';
import { ApiTypes, client } from '@/prisma/apiclient';

type News = ApiTypes["News"];
type NewsUpdate = ApiTypes["NewsUpdateRequest"]["data"]["attributes"];

export default function NewsUpdate({ newsId }: { newsId: string }) {
    const [news, setNews] = React.useState<News | null | undefined>(null);
    const { push } = useRouter();

    async function loadForm(id: string) {
        const response = await client.GET("/api/model/rest/news/{id}", {
            params: {
                path: { id },
            }
        });
        if (response.response.status === 200) {
            const data: News = { ...response.data!.data };
            setNews(data);
        } else {
            setNews(undefined);
        }
    }
    if (news === null)
        loadForm(newsId);
    const fields: SchemaInfo["fields"] = {
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
        const attributes = data as NewsUpdate;
        delete attributes.createdAt;
        delete attributes.updatedAt;

        const response = await client.PATCH("/api/model/rest/news/{id}", {
            params: {
                path: {
                    id: newsId
                },
            },
            body: {
                data: {
                    type: "news",
                    id: Number(newsId),
                    attributes: attributes
                }
            }
        })
        if (response.response.status === 200) {
            push(`/admin/news/${newsId}`);
        } else {
            const errors = response.error
            setErrors(errors as unknown as string);
        }
    };

    return (
        <div>
            {
                news === null ? (
                    <p>Loading...</p>
                ) : news === undefined ? (
                    <p>News not found</p>
                ) : (
                    <Form schemaInfo={
                        {
                            schema: NewsCreateSchema,
                            name: "news-update-form",
                            formProps: {
                                defaultValues: news.attributes
                            },
                            formTitle: "News Info",

                            formDescription: "Here you can update news info.",
                            fields,
                            onSubmit
                        }
                    } />
                )
            }

        </div>
    );
}