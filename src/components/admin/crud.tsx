"use client"

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import Form, { type FieldInfo, type SchemaInfo } from "@/components/form";
import { Button, H2, H3 } from "@/components";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

import { CrudConfig, Resource, CrudEndpoints, defaultAccess } from "./crud-types";

/* ---------------- Shared helpers ---------------- */

function humanize(field: string) {
    return field.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());
}

/** Client-side mirror of the server-side role check; UX only, not security. */
function useCan(required: bigint[]): boolean {
    const { data: session } = useSession();
    const roleIds =
        (session?.user as { roles?: { id: bigint }[] } | undefined)?.roles?.map((r) => r.id) ?? [];
    return required.length === 0 || required.some((r) => roleIds.includes(r));
}


/** Merges loadOptions() output into the matching select fields. */
function useFieldsWithOptions<A extends Record<string, unknown>>(
    config: CrudConfig<A>,
): Record<string, FieldInfo> {
    const [fields, setFields] = useState(config.fields);

    useEffect(() => {
        if (!config.loadOptions) return;
        let cancelled = false;
        config.loadOptions().then((loaded) => {
            if (cancelled) return;
            setFields((prev) => {
                const next = { ...prev };
                for (const [name, options] of Object.entries(loaded)) {
                    if (next[name]) next[name] = { ...next[name], options };
                }
                return next;
            });
        });
        return () => {
            cancelled = true;
        };
    }, [config]);

    return fields;
}

function DefaultListItem<A extends Record<string, unknown>>({
    item,
    config,
}: {
    item: Resource<A>;
    config: CrudConfig<A>;
}) {
    const skip = new Set<string>([config.displayField, ...(config.readonlyFields ?? [])]);
    const extras = (Object.entries(item.attributes) as [string, unknown][])
        .filter(
            ([key, value]) =>
                !skip.has(key) && !key.endsWith("Id") &&
                typeof value === "string" && value.length > 0,
        )
        .slice(0, 3);
    return (
        <>
            {extras.map(([key, value]) => (
                <p key={key}>{String(value)}</p>
            ))}
        </>
    );
}

/* ---------------- List ---------------- */

export function CrudList<A extends Record<string, unknown>>({
    config,
    endpoints,
}: {
    config: CrudConfig<A>;
    endpoints: CrudEndpoints<A>;
}) {
    const [items, setItems] = useState<Resource<A>[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const canCreate = useCan(config.access?.create ?? defaultAccess.create);
    const basePath = config.basePath ?? `/admin/model/${config.key}`;

    const fetchItems = useCallback(async () => {
        setLoading(true);
        setError(null);
        const { response, data } = await endpoints.list();
        if (response.status === 200 && data) {
            setItems(data.data);
        } else {
            setItems([]);
            setError(`Could not load ${config.title.toLowerCase()} (status ${response.status}).`);
        }
        setLoading(false);
    }, [endpoints, config.title]);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    return (
        <div className="mx-4 mt-4">
            <H2 className="flex justify-between items-center">
                {config.title}
                <div>
                    {canCreate && (
                        <Link href={`${basePath}/create`}>
                            <Button>Create</Button>
                        </Link>
                    )}
                    <Button onClick={fetchItems}>Refresh</Button>
                </div>
            </H2>
            <div className="px-4">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : items && items.length > 0 ? (
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {items.map((item) => (
                            <AccordionItem
                                key={item.id}
                                value={item.id.toString()}
                                className="border border-1 border-b rounded-lg border-red w-full"
                            >
                                <AccordionTrigger
                                    arrow_size="size-10"
                                    className="border border-red px-6 text-red-500"
                                >
                                    <div className="flex justify-between w-full">
                                        <H3>{config.displayItem ? config.displayItem(item) : String(item.attributes[config.displayField] ?? item.id)}</H3>
                                        <Link href={`${basePath}/${item.id}`}>
                                            <Button>Manage</Button>
                                        </Link>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="border-red gap-4 p-4 text-balance">
                                    {config.renderListItem ? (
                                        config.renderListItem(item)
                                    ) : (
                                        <DefaultListItem item={item} config={config} />
                                    )}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                ) : (
                    <p>No {config.title.toLowerCase()} found.</p>
                )}
            </div>
        </div>
    );
}

/* ---------------- Update (+ delete) ---------------- */

export function CrudUpdate<A extends Record<string, unknown>>({
    config,
    endpoints,
    id,
}: {
    config: CrudConfig<A>;
    endpoints: CrudEndpoints<A>;
    id: string;
}) {
    // undefined = loading, null = not found
    const [item, setItem] = useState<Resource<A> | null | undefined>(undefined);
    const [deleteError, setDeleteError] = useState<string | null>(null);
    const [deleting, setDeleting] = useState(false);
    const baseFields = useFieldsWithOptions(config);
    const canDelete = useCan(config.access?.delete ?? defaultAccess.delete);
    const { push } = useRouter();
    const basePath = config.basePath ?? `/admin/model/${config.key}`;

    useEffect(() => {
        let cancelled = false;
        (async () => {
            const { response, data } = await endpoints.get(id, config.include?.query);
            if (cancelled) return;
            if (response.status !== 200 || !data) {
                setItem(null);
                return;
            }
            const resource = data.data;
            if (config.include) {
                const included = (data as { included?: Resource<A>[] }).included?.find(
                    (i) => i.type === config.include!.type,
                );
                (resource.attributes as Record<string, unknown>)[config.include.query] =
                    included ?? null;
            }
            setItem(resource);
        })();
        return () => {
            cancelled = true;
        };
    }, [endpoints, config, id]);

    if (item === undefined) return <p>Loading...</p>;
    if (item === null) return <p>{config.singular ?? config.title} not found.</p>;

    const fields: Record<string, FieldInfo> = { ...baseFields };
    for (const readonlyField of config.readonlyFields ?? []) {
        fields[readonlyField] = {
            label: humanize(readonlyField),
            type: "text",
            fieldProps: { disabled: true },
        };
    }
    for (const [fieldName, includeKey] of Object.entries(config.imageFields ?? {})) {
        const media = (item.attributes as Record<string, unknown>)[includeKey] as
            | { attributes?: { filepath?: string } }
            | null
            | undefined;
        if (fields[fieldName] && media?.attributes?.filepath) {
            fields[fieldName] = { ...fields[fieldName], preview: media.attributes.filepath };
        }
    }

    const onSubmit: SchemaInfo["onSubmit"] = async (data, setErrors) => {
        const attributes = config.transform
            ? config.transform({ ...(data as Partial<A>) })
            : { ...(data as Partial<A>) };
        for (const readonlyField of config.readonlyFields ?? []) {
            delete attributes[readonlyField];
        }
        const { response, error } = await endpoints.update(id, attributes);
        if (response.status === 200) {
            push(`${basePath}/${id}`);
        } else {
            setErrors(error ? JSON.stringify(error) : `Update failed (status ${response.status}).`);
        }
    };

    const onDelete = async () => {
        if (!window.confirm(`Delete this ${config.singular ?? config.title}? This cannot be undone.`)) return;
        setDeleting(true);
        setDeleteError(null);
        const { response, error } = await endpoints.delete(id);
        if (response.status == 200) {
            push(basePath);
        } else {
            setDeleteError(error ? JSON.stringify(error) : `Delete failed (status ${response.status}).`);
        }
    };

    return (
        <div>
            <Form
                schemaInfo={{
                    schema: config.schema,
                    name: `${config.route}-update-form`,
                    formProps: { defaultValues: item.attributes },
                    formTitle: `${config.singular ?? config.title} Info`,
                    formDescription: `Here you can update ${(
                        config.singular ?? config.title
                    ).toLowerCase()} info.`,
                    fields,
                    onSubmit,
                }}
            />
            {canDelete && (
                <div className="mx-4 flex flex-col items-end gap-2">
                    <Button disabled={deleting} onClick={onDelete}>
                        {deleting ? "Deleting..." : `Delete ${config.singular ?? config.title}`}
                    </Button>
                    {deleteError && <p className="text-red-600 text-sm">{deleteError}</p>}
                </div>
            )}
        </div>
    );
}

/* ---------------- Create ---------------- */

export function CrudCreate<A extends Record<string, unknown>>({
    config,
    endpoints,
}: {
    config: CrudConfig<A>;
    endpoints: CrudEndpoints<A>;
}) {
    const fields = useFieldsWithOptions(config);
    const { push } = useRouter();
    const basePath = config.basePath ?? `/admin/model/${config.key}`;

    const onSubmit: SchemaInfo["onSubmit"] = async (data, setErrors) => {
        const attributes = config.transform
            ? config.transform(data as Partial<A>)
            : (data as Partial<A>);
        const { response, data: created, error } = await endpoints.create(attributes);
        if (response.status === 201 && created) {
            push(`${basePath}/${created.data.id}`);
        } else {
            setErrors(error ? JSON.stringify(error) : `Create failed (status ${response.status}).`);
        }
    };

    return (
        <Form
            schemaInfo={{
                schema: config.schema,
                name: `${config.route}-create-form`,
                formTitle: `Create new ${config.singular ?? config.title}`,
                formDescription: `Here you can create a new ${(
                    config.singular ?? config.title
                ).toLowerCase()}.`,
                fields,
                onSubmit,
            }}
        />
    );
}