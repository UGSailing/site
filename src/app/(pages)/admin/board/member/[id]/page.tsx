"use server";

import React from 'react';
import Memberupdate from '@/components/admin/board/member/update';

export default async function MemberPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return (
        <>
            {
                <Memberupdate memberId={ id } />
            }
        </>
    )
    
}
