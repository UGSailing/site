import { NextRequest, NextResponse } from 'next/server'

import { auth } from '@/lib/auth'

export async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/admin') || request.nextUrl.pathname === "/account") {
        const resp = await auth();
        if (!resp) {
            // src/middleware.ts — in the unauthenticated branch
            const loginUrl = new URL("/api/login", request.url);
            loginUrl.searchParams.set(
                "callbackUrl",
                request.nextUrl.pathname + request.nextUrl.search,   // includes query strings, e.g. /admin/event/42
            );
            return NextResponse.redirect(loginUrl);
        }
    }
}

export const config = {
    runtime: 'nodejs',
}

