"use server";

import React from 'react';
import EventUpdate from '@/components/admin/event/update';

export default async function EventPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return (
        <>
            {
                <EventUpdate eventId={ id } />
            }
        </>
    )
    
}
