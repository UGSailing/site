import { notFound } from "next/navigation";
import { requireRole } from "@/lib/auth-helpers";
import { Http403 } from "@/components/http";

import { CrudRouter } from "@/components/admin/crudRouter";
import { resolveAction, resolveEntry } from "@/components/admin/registry";
import { defaultAccess } from "@/components/admin/crud-types";

export default async function ModelsPage({
    params,
}: {
    params: Promise<{ path: string[] }>;
}) {
    const { path = [] } = await params;

    // Same resolver the client router uses — one source of truth.
    const entry = resolveEntry(path);
    if (!entry) notFound();

    const action = resolveAction(path); // "list" | "create" | "update"
    
    const role = await requireRole((entry.config.access ?? defaultAccess)[action]);
    if (role.status === 403) return <Http403 />;

    // Only `path` (strings) crosses into the client component.
    return <CrudRouter path={path} />;
}