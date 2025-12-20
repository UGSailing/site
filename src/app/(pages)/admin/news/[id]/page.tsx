"use server";

import React from 'react';
import NewsUpdate from '@/components/admin/news/update';

export default async function NewsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return (
        <>
            {
                <NewsUpdate newsId={ id } />
            }
        </>
    )
    
}
