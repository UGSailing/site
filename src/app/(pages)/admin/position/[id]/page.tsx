"use server";

import React from 'react';
import PositionUpdate from '@/components/admin/board/position/update';
import { requireRole } from '@/lib/auth-helpers';
import { ROLES } from '@/lib/auth-types';
import { Http403 } from '@/components/http';

export default async function PositionPage({ params }: { params: Promise<{ id: string }> }) {
    const role = await requireRole(ROLES.TEAM)
    if (role.status == 403) {
        return <Http403/>
    }
    const { id } = await params;
    return (
        <>
            {
                <PositionUpdate positionId={ id } />
            }
        </>
    )
    
}
