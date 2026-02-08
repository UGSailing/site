"use server";

import React from 'react';
import PositionUpdate from '@/components/admin/board/position/update';

export default async function PositionPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return (
        <>
            {
                <PositionUpdate positionId={ id } />
            }
        </>
    )
    
}
