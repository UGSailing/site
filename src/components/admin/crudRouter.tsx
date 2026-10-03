"use client";
import { notFound } from "next/navigation";
import { CrudCreate, CrudList, CrudUpdate } from "./crud";
import { type CrudConfig, type CrudEndpoints } from "./crud-types";
import { registry } from "./registry";

export function CrudRouter({ path }: { path: string[] }) {
    const [model, action] = path;
    const entry = model ? registry[model as keyof typeof registry] : undefined;
    if (!entry) notFound();

    // Generics are erased at the registry boundary and re-narrowed by the factory.
    const { config, endpoints } = entry as unknown as {
        config: CrudConfig<never>;
        endpoints: CrudEndpoints<never>;
    };

    if (action === undefined) return <CrudList config={config} endpoints={endpoints} />;
    if (action === "create") return <CrudCreate config={config} endpoints={endpoints} />;
    return <CrudUpdate config={config} endpoints={endpoints} id={action} />;
}