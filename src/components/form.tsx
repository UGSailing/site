"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import React, { useMemo } from 'react';
import { ReactNode, useState } from 'react';
import { useForm, Controller, ControllerRenderProps, ControllerFieldState, UseFormProps } from 'react-hook-form';
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
import Markdown from './markdown';

type FieldType = "text" | "textarea" | "number" | "datetime"

export interface FieldInfo {
    type: FieldType;
    label?: string;
    description?: string | ReactNode;
    placeholder?: string;
    onChange?: (value: any) => void;
}

export function FormField({
    form,
    fieldName,
    fieldInfo,
    customOnChange,
}: {
    form: ReturnType<typeof useForm>;
    fieldName: string;
    fieldInfo: FieldInfo;
    customOnChange?: (value: any) => void;
}) {
    const defaultValue = useMemo(() => {
        switch (fieldInfo.type) {
            case "text":
            case "textarea":
                return "";
            case "number":
                return 0;
            case "datetime":
                return new Date();
        }
    }, []);

    const renderField = (
        field: ControllerRenderProps, 
        fieldState: ControllerFieldState
    ) => {
        const handleChange = (value: any) => {
            field.onChange(value);
            if (customOnChange) {
                customOnChange(value);
            }
        }
        switch (fieldInfo.type) {
            case "text":
            case "number":
                return <Input
                    {...field}
                    id={field.name}
                    placeholder={fieldInfo?.placeholder}
                    aria-invalid={fieldState.invalid}
                    autoComplete='off'
                    type={fieldInfo.type}
                    value={field.value ?? defaultValue}
                    onChange={handleChange}
                />
            case "datetime":
                return <DateTimePicker
                    value={field.value as Date ?? defaultValue}
                    onChange={handleChange}
                />
            case "textarea":
                return <Markdown
                    {...field}
                    value={field.value as string ?? defaultValue}
                    onChange={handleChange}
                    textareaProps={{ placeholder: fieldInfo.placeholder }}
                />
        }
    }

    return (
        <Controller
            name={fieldName}
            control={form.control}
            render={({ field, fieldState }) => (
                (
                    <Field data-invalid={fieldState.invalid}>
                        {fieldInfo?.label && <FieldLabel htmlFor={field.name}>{fieldInfo.label}</FieldLabel>}
                        {renderField(field, fieldState)}
                        {fieldInfo?.description && (
                            <FieldDescription>
                                {fieldInfo?.description}
                            </FieldDescription>
                        )}
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
    onChange?: (data: any) => void;
    formProps?: Partial<UseFormProps<any>>;
}


export default function Form(
    schemaInfo: SchemaInfo,
    fetchOptions: RequestInit = { method: 'POST', headers: { 'content-type': 'application/json' } }
) {
    type Input = z.TypeOf<typeof schemaInfo.schema>;
    // @ts-expect-error - zodResolver types are broken
    const form = useForm<Input>({
        ...schemaInfo.formProps,
        // @ts-expect-error - zodResolver types are broken
        resolver: zodResolver(schemaInfo.schema),
    });

    const [serverError, setServerError] = useState<string>("");

    async function onSubmit(data: Input) {
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

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>{schemaInfo.formTitle}</CardTitle>
                <CardDescription>
                    {schemaInfo.formDescription}
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
                                    customOnChange={(value: any) => {fieldInfo.onChange?.(value); schemaInfo.onChange?.(form.getValues());}}
                                />
                            ))
                        }
                    </FieldGroup>
                </form>
                <CardFooter className="px-0">
                    <div className="flex gap-4 pt-4 w-full justify-end">
                        <Button type="button" variant="outline" onClick={() => form.reset()}>
                            Reset
                        </Button>
                        <Button type="submit" form={`${schemaInfo.name}-form`}>
                            Submit
                        </Button>
                    </div>
                    {serverError && <p className="text-red-600 text-sm">{serverError}</p>}
                </CardFooter>
            </CardContent>

        </Card>
    );
}
