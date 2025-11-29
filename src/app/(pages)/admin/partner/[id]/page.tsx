"use server";

import React from 'react';
import PartnerUpdate from '@/components/admin/partner/update';

export default async function PartnerPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return (
        <>
            {
                <PartnerUpdate partnerId={ id } />
            }
        </>
    )
    
}
