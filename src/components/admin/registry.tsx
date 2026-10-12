// src/components/zenstack/registry.ts
// Adding an entity = one line here + one config file. No page files.
import type { CrudConfig, CrudEndpoints } from "./crud-types";
// registry.ts additions
import { eventConfig, eventEndpoints } from "./event"
import { newsConfig, newsEndpoints } from "./news";
import { partnerConfig, partnerEndpoints } from "./partner";
import { boardConfig, boardEndpoints } from "./board";
import { memberConfig, memberEndpoints } from "./boardMember";
import { memberYearConfig, memberYearEndpoints } from "./boardMemberYear";
import { memberPositionConfig, memberPositionEndpoints } from "./boardMemberPosition";
import { positionConfig, positionEndpoints } from "./position";

// import { partnerConfig, partnerEndpoints } from "./partner";
// ...one import + one line per entity...

export type RegistryKey = keyof typeof registry;
export type CrudAction = "list" | "create" | "update";

// Generic types erased at this boundary; the factory re-narrows them.
type AnyEntry = {
    config: CrudConfig<never>;
    endpoints: CrudEndpoints<never>;
};

export function getEntry(key: string): AnyEntry | undefined {
    return (registry as Record<string, unknown>)[key] as AnyEntry | undefined;
}

/** path = ["event"] | ["event", "create"] | ["event", "123"] */
export function resolveAction(path: string[]): CrudAction {
    const action = path[1];
    return action === undefined ? "list" : action === "create" ? "create" : "update";
}

export function resolveEntry(path: string[]): AnyEntry | undefined {
    return path[0] ? getEntry(path[0]) : undefined;
}

export const registry = {
    event: { config: eventConfig, endpoints: eventEndpoints },
    news: { config: newsConfig, endpoints: newsEndpoints },
    partner: { config: partnerConfig, endpoints: partnerEndpoints },
    board: { config: boardConfig, endpoints: boardEndpoints },
    member: { config: memberConfig, endpoints: memberEndpoints },
    memberyear: { config: memberYearConfig, endpoints: memberYearEndpoints },
    memberposition: { config: memberPositionConfig, endpoints: memberPositionEndpoints },
    position: { config: positionConfig, endpoints: positionEndpoints },
} as const;