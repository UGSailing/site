"use server";

import React from 'react';
import { client, paths } from '@/prisma';
import PartnerUpdate from '@/components/admin/partner/update';

export default async function PartnerPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const response = await client.GET("/api/model/rest/partner/{id}", {
        params: {
            path: { id }
        }
    })
    const partner = response.response.status === 200 ? response.data!.data : null;
    return (
        <>
            {
                partner ? (
                    <PartnerUpdate partner={partner} />
                ) : (
                    <div>
                        Partner not found
                    </div>
                )
            }
        </>
    )
    
}
