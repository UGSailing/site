"use server";

import React from 'react';
import BoardUpdate from '@/components/admin/board/update';

export default async function EventPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return (
        <>
            {
                <BoardUpdate boardId={ id } />
            }
        </>
    )
    
}
