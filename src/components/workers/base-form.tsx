"use client";

import React from 'react';
import { JobCreateSchema } from '@zenstackhq/runtime/zod/models';
import Form, { type SchemaInfo } from '@/components/form';
import { redirect } from 'next/navigation';
import { client, type ApiTypes } from '@/prisma/apiclient';

type JobType = ApiTypes["JobCreateRequest"]["data"]["attributes"];

interface JobFrameProps {
    jobName: string;
    children: React.ReactNode;
    getRequestPayload: () => string | Promise<string>;
    formTitle?: string;
    formDescription?: string;
}

export default function JobFormFrame({ 
    jobName,
    children,
    getRequestPayload,
    formTitle = `Create new ${jobName} Job`,
    formDescription = "Here you can create a new job."
}: JobFrameProps) {
    const schemaInfo: SchemaInfo = {
        schema: 
    JobCreateSchema.superRefine((data, ctx) => {
        console.log('Validating data:', data);
    }),
        name: "job-create-form",
        formTitle,
        formDescription,
        onSubmit: async (data, setErrors) => {
            const attributes = data as JobType;
            attributes.request_payload = await getRequestPayload();
            console.log(attributes);
            
            const response = await client.POST("/api/model/rest/job", {
                body: {
                    data: {
                        type: "job",
                        attributes: attributes
                    }
                }
            });
            console.log(response);
            if (response.response.status === 202) {
                redirect(`/jobs/${response.data!.data.id}`);
            } else {
                const errors = response.error
                setErrors(errors as unknown as string);
            }
        },
        fields: {
            type: {
                label: "Job Name",
                type: 'text',
                fieldProps: {
                    disabled: true,
                },
                hidden: true
            },
            status: {
                label: "Status",
                type: 'text',
                fieldProps: {
                    disabled: true,
                },
                hidden: true
            }
        },
    };
    
    return (
        <>
            {children}
            <Form schemaInfo={schemaInfo} />
        </>
    );
}
