"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import React from 'react';
import { ReactNode, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "./ui/field"
import { Input } from "./ui/input"
import { DateTimePicker } from './ui/datetime-picker';
import { Button } from './ui/button';

export interface FieldInfo {
    type: string;
    label?: string;
    description?: string | ReactNode;
    placeholder?: string;
}

export function FormField({
    form,
    fieldName,
    fieldInfo,
}: {
    form: ReturnType<typeof useForm>;
    fieldName: string;
    fieldInfo: FieldInfo;
}) {
    return (
        <Controller
            name={fieldName}
            control={form.control}
            render={({ field, fieldState }) => (
                (
                    <Field data-invalid={fieldState.invalid}>
                        {
                            fieldInfo?.label && (
                                <FieldLabel htmlFor={field.name}>{fieldInfo.label}</FieldLabel>
                            )
                        }
                        {
                            fieldInfo.type === 'datetime' ? (
                                <DateTimePicker value={field.value as Date | undefined} onChange={field.onChange} />
                            ) : (
                                <Input
                                    {...field}
                                    id={field.name}
                                    placeholder={fieldInfo?.placeholder}
                                    aria-invalid={fieldState.invalid}
                                    autoComplete='off'
                                    type={fieldInfo.type}
                                />
                            )
                        }
                        {
                            fieldInfo?.description && (
                                (
                                    <FieldDescription>
                                        {fieldInfo?.description}
                                    </FieldDescription>
                                )
                            )
                        }
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )
            )}
        />
    )
}

export interface SchemaInfo {
    schema: z.ZodType<unknown>;
    fields: Record<string, FieldInfo>;
    name: string;
    formTitle: string;
    endpoint: string | URL | globalThis.Request;
    formDescription?: string | ReactNode;
}


export default function Form(
    schemaInfo: SchemaInfo,
    fetchOptions: RequestInit = { method: 'POST', headers: { 'content-type': 'application/json' } }
) {
    type Input = z.TypeOf<typeof schemaInfo.schema>;
    // @ts-expect-error - zodResolver types are broken
    const form = useForm<Input>({
        defaultValues: { description: '' },
        // @ts-expect-error - zodResolver types are broken
        resolver: zodResolver(schemaInfo.schema),
    });

    const [serverError, setServerError] = useState<string>("");

    async function onSubmit(data: Input) {
        console.log(data);
        const resp = await fetch(schemaInfo.endpoint, {
            ...fetchOptions,
            body: JSON.stringify({ data: { type: schemaInfo.name, attributes: data } }),
        });

        if (resp.status !== 201) {
            setServerError((await resp.text()));
        } else {
            alert('Submitted form successfully!');
        }
    }
    console.log(serverError);
    console.log(form);

    return (
        <Card className="w-full sm:max-w-md">
            <CardHeader>
                <CardTitle>Create new Event</CardTitle>
                <CardDescription>
                    Here you can create a new event.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form id={`${schemaInfo.name}-form`} onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        {
                            Object.entries(schemaInfo.fields).map(([fieldName, fieldInfo]) => (
                                <FormField
                                    key={fieldName}
                                    // @ts-expect-error - zodResolver types are broken
                                    form={form}
                                    fieldName={fieldName as keyof Input & string}
                                    fieldInfo={fieldInfo}
                                />
                            ))
                        }
                    </FieldGroup>
                </form>
                <CardFooter>
                    <Field orientation="horizontal">
                        <Button type="button" variant="outline" onClick={() => form.reset()}>
                            Reset
                        </Button>
                        <Button type="submit" form={`${schemaInfo.name}-form`}>
                            Submit
                        </Button>
                    </Field>
                    {serverError && (
                        <p className="text-red-600 text-sm">{serverError}</p>
                    )}
                </CardFooter>
            </CardContent>

        </Card>
    );
}