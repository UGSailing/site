import { ApiTypes, client, paths } from "@/prisma/apiclient";
import type { z } from "zod";
import { FieldInfo } from "@/components/form";
import { ROLES } from "@/lib/auth-types";

export interface Resource<A extends Record<string, unknown>> {
    id: string | number; // ZenStack generates numeric ids
    type: string;
    attributes: A;
}

export interface CrudAccess {
    /** bigint role ids, same shape as adminSidebar's `roles` field */
    list: bigint[];
    create: bigint[];
    update: bigint[];
    delete: bigint[];
}

export const defaultAccess: CrudAccess = {
    list: ROLES.TEAM,
    create: ROLES.TEAM,
    update: ROLES.TEAM,
    delete: ROLES.ADMIN,
}

export interface CrudConfig<A extends Record<string, unknown>> {
    /** registry key / URL segment: /admin/models/<key> */
    key: string;
    /** ZenStack model name: /api/model/rest/<route> and prisma delegate */
    route: string;
    title: string;
    singular?: string;
    displayField: keyof A & string;
    fields: Record<string, FieldInfo>;
    schema: z.ZodType<unknown>;
    /** defaults to /admin/models/<key>; override if the entity keeps its own route */
    basePath?: string;
    include?: { query: string; type: string };
    readonlyFields?: (keyof A & string)[];
    /** called before create AND update submits (e.g. partner url fixup) */
    displayItem?: (item: Resource<A>) => string;
    transform?: (attributes: Partial<A>) => Partial<A>;
    /** fills `options` on select fields client-side */
    loadOptions?: () => Promise<Record<string, { label: string; value: string | number }[]>>;
    /** per-action role gate; enforced server-side by the page and the delete action */
    access?: CrudAccess;
    renderListItem?: (item: Resource<A>) => React.ReactNode;
    imageFields?: Record<string, string>;
}

type EndpointResult<R> = Promise<{ response: Response; data?: R; error?: unknown }>;

export interface CrudEndpoints<A extends Record<string, unknown>> {
    list: () => EndpointResult<{ data: Resource<A>[] }>;
    get: (id: string, include?: string) => EndpointResult<{ data: Resource<A> }>;
    create: (attributes: Partial<A>) => EndpointResult<{ data: Resource<A> }>;
    update: (id: string, attributes: Partial<A>) => EndpointResult<{ data: Resource<A> }>;
    delete: (id: string) => EndpointResult<{ headers: unknown, data: undefined }>;
}


/* ---------------- Endpoint derivation ----------------
 * The ZenStack REST surface is uniform (/api/model/rest/<model>[/{id}]),
 * so the five calls can be derived from the model name alone.
 * Type safety is preserved at the CrudEndpoints<A> boundary — the single
 * cast below is contained here instead of being repeated per entity.
 * (Step 3's plugin generates this from the zmodel, replacing the cast
 * with codegen'd literals.)
 */

type ItemPath = Extract<
  keyof paths,
  `/api/model/rest/${string}/{id}`
>;

type CollectionPath = Exclude<
  Extract<keyof paths, `/api/model/rest/${string}`>,
  `${string}/{id}`
>;

type RouteFromPath<P> =
  P extends `/api/model/rest/${infer R}` ? R : never;

type CollectionPathFor<R extends string> = Extract<
  CollectionPath,
  `/api/model/rest/${R}`
>;

type ItemPathFor<R extends string> = Extract<
  ItemPath,
  `${CollectionPathFor<R>}/{id}`
>;

type LooseInit = {
  params?: {
    path?: Record<string, string | number>;
    query?: Record<string, unknown>;
  };
  body?: unknown;
};

type LooseClient = {
  GET(path: string, init?: LooseInit): unknown;
  POST(path: string, init?: LooseInit): unknown;
  PATCH(path: string, init?: LooseInit): unknown;
  DELETE(path: string, init?: LooseInit): EndpointResult<{ headers: unknown, data: undefined }>;
};

const restClient = client as unknown as LooseClient;

export function createEndpoints<A extends Record<string, unknown>>(
    route: string,
    /** for the rare model whose calls deviate from the uniform shape */
    overrides: Partial<CrudEndpoints<A>> = {},
): CrudEndpoints<A> {
    const base = `/api/model/rest/${route}`;
    const item = `${base}/{id}`;

    return {
        list: () => restClient.GET(base) as unknown as EndpointResult<{ data: Resource<A>[] }>,
        get: (id, include) =>
            restClient.GET(item, {
                params: { path: { id }, query: include ? { include } : {} },
            }) as unknown as EndpointResult<{ data: Resource<A> }>,
        create: (attributes) =>
            restClient.POST(base, {
                body: { data: { type: route, attributes } },
            }) as unknown as EndpointResult<{ data: Resource<A> }>,
        update: (id, attributes) =>
            restClient.PATCH(item, {
                params: { path: { id } },
                body: { data: { type: route, id: Number(id), attributes } },
            }) as unknown as EndpointResult<{ data: Resource<A> }>,
        delete: (id) => restClient.DELETE(item, { params: { path: { id } } }),
        ...overrides,
    };
}