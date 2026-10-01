"use server";

import React from 'react';
import PartnerUpdate from '@/components/admin/partner/update';
import { requireRole } from '@/lib/auth-helpers';
import { ROLES } from '@/lib/auth-types';
import { Http403 } from '@/components/http';

export default async function PartnerPage({ params }: { params: Promise<{ id: string }> }) {
    const role = await requireRole(ROLES.TEAM)
    if (role.status == 403) {
        return <Http403/>
    }
    const { id } = await params;
    return (
        <>
            {
                <PartnerUpdate partnerId={ id } />
            }
        </>
    )
    
}
