"use server";

import React from 'react';
import BoardUpdate from '@/components/admin/board/update';
import { requireRole } from '@/lib/auth-helpers';
import { ROLES } from '@/lib/auth-types';
import { Http403 } from '@/components/http';

export default async function EventPage({ params }: { params: Promise<{ id: string }> }) {
    const role = await requireRole(ROLES.TEAM)
    if (role.status == 403) {
        return <Http403/>
    }
    const { id } = await params;
    return (
        <>
            {
                <BoardUpdate boardId={ id } />
            }
        </>
    )
    
}
