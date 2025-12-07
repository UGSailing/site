"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import React from 'react';
import { ReactNode, useState } from 'react';
import { useForm, Controller, ControllerRenderProps, ControllerFieldState, UseFormProps } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "./ui/field"
import { Input } from "./ui/input"
import { ImageUpload } from "./ui/image-upload"
import { DateTimePicker } from './ui/datetime-picker';
import { Button } from './ui/button';
import Markdown from './markdown';

type FieldType = "text" | "textarea" | "number" | "datetime" | "checkbox" | "image";

export interface FieldInfo {
    type: FieldType;
    label?: string;
    description?: string | ReactNode;
    placeholder?: string;
    onChange?: (value: unknown) => void;
    fieldProps?: Partial<ControllerRenderProps>;
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
    customOnChange?: (value: unknown) => void;
}) {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const defaultValue = (() => {
        switch (fieldInfo.type) {
        case "text":
        case "textarea":
            return "";
        case "number":
            return 0;
        case "datetime":
            return new Date();
        case "image":
            return null;
        case "checkbox":
            return false;
        }
    })();

    const renderField = (
        field: ControllerRenderProps, 
        fieldState: ControllerFieldState
    ) => {
        if (field.name === "createdAt" || field.name === "updatedAt") {
            const value = new Date(field.value).toLocaleString();
            if (value !== "Invalid Date") {
                field.value = value;
            }
        }
        const handleChange = (value: unknown) => {
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
                {...fieldInfo.fieldProps}
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
                {...field}
                {...fieldInfo.fieldProps}
                value={field.value as Date ?? defaultValue}
                onChange={handleChange}
            />
        case "textarea":
            return <Markdown
                {...field}
                {...fieldInfo.fieldProps}
                value={field.value as string ?? defaultValue}
                onChange={handleChange}
                textareaProps={{ placeholder: fieldInfo.placeholder }}
            />
        case "checkbox":
            return <input
                {...field}
                {...fieldInfo.fieldProps}
                id={field.name}
                placeholder={fieldInfo?.placeholder}
                aria-invalid={fieldState.invalid}
                type="checkbox"
                checked={field.value as boolean ?? defaultValue}
                onChange={handleChange}
            />
        case "image":
            return <ImageUpload
                preview={imagePreview || (field.value && (typeof field.value.attributes?.filepath === 'string' ? field.value.attributes.filepath : null)) || null}
                isUploading={isUploading}
                onImageSelected={async (file, setError) => {
                    // Show preview immediately
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        setImagePreview(e.target?.result as string);
                    };
                    reader.readAsDataURL(file);
                    
                    setError?.(null);
                    setIsUploading(true);
                    
                    try {
                        const formData = new FormData();
                        formData.append('file', file);
                        formData.append('filename', file.name);
                        
                        const response = await fetch('/api/media', {
                            method: 'POST',
                            body: formData,
                        });
                        
                        if (!response.ok) {
                            const errorData = await response.json().catch(() => ({}));
                            const errorMessage = errorData.error || `Upload failed with status ${response.status}`;
                            console.log(errorMessage);
                            setError?.(errorMessage);
                            setImagePreview(null);
                            setIsUploading(false);
                            return;
                        }
                        
                        const data = await response.json();
                        
                        // Set the media ID to the form field (not the file)
                        field.onChange(data.data.id);
                        handleChange(data.data.id);
                        setIsUploading(false);
                    } catch (error) {
                        const errorMessage = error instanceof Error ? error.message : 'Failed to upload image';
                        console.error('Image upload failed:', error);
                        setError?.(errorMessage);
                        setImagePreview(null);
                        setIsUploading(false);
                    }
                }}
                onImageRemoved={() => {
                    field.onChange(null);
                    setImagePreview(null);
                }}
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
    onSubmit: (data: unknown, setErrors: (value: React.SetStateAction<string>) => void) => void;
    formDescription?: string | ReactNode;
    onChange?: (data: unknown) => void;
    // @ts-expect-error - zodResolver types are broken
    formProps?: Partial<UseFormProps<unknown>>;
}


export default function Form({
    schemaInfo
} : {
    schemaInfo: SchemaInfo;
}) {
    type Input = z.TypeOf<typeof schemaInfo.schema>;
    // @ts-expect-error - zodResolver types are broken
    const form = useForm<Input>({
        ...schemaInfo.formProps,
        // @ts-expect-error - zodResolver types are broken
        resolver: zodResolver(schemaInfo.schema),
    });

    const [serverError, setServerError] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    async function onSubmit(data: Input) {
        try {
            setIsSubmitting(true);
            await schemaInfo.onSubmit(data, setServerError);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Card className="w-full border-none shadow-none">
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
                                    customOnChange={(value: unknown) => {fieldInfo.onChange?.(value); schemaInfo.onChange?.(form.getValues());}}
                                />
                            ))
                        }
                    </FieldGroup>
                </form>
                <div className="flex gap-4 pt-4 w-full justify-end">
                    <Button type="button" disabled={isSubmitting} variant="outline" className="cursor-pointer" onClick={() => form.reset()}>
                        Reset
                    </Button>
                    <Button type="submit" disabled={isSubmitting} form={`${schemaInfo.name}-form`} className="cursor-pointer">
                        Submit
                    </Button>
                </div>
                {serverError && <p className="text-red-600 text-sm">{serverError}</p>}
            </CardContent>

        </Card>
    );
}
