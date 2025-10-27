import { NextRequest, NextResponse } from 'next/server'

import { auth } from '@/lib/auth'

export async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/admin')) {
        const resp = await auth();
        if (!resp) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }
}

export const config = {
    runtime: 'nodejs',
}

