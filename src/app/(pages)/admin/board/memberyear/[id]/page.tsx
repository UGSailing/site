"use server";

import React from 'react';
import MemberYearUpdate from '@/components/admin/board/memberyear/update';

export default async function MemberYearPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return (
        <>
            {
                <MemberYearUpdate boardMemberYearId={ id } />
            }
        </>
    )
    
}
