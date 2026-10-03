import { signIn } from "@/lib/auth";
import type { NextRequest } from "next/server";

function safeTarget(url: string | null): string {
    return url && url.startsWith("/") ? url : "/";
}

export async function GET(req: NextRequest) {
    // Throws a redirect to Discord — cookies are writable here.
    await signIn("discord", {
        redirectTo: safeTarget(req.nextUrl.searchParams.get("callbackUrl")),
    });
}