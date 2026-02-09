"use server";

import React from 'react';
import BoardMemberPositionUpdate from '@/components/admin/board/memberposition/update';

export default async function MemberPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return (
        <>
            {
                <BoardMemberPositionUpdate boardMemberPositionId={ id } />
            }
        </>
    )
    
}
