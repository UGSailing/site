"use client";

import React from 'react';
import { A, Button, H2, H3 } from "@/components"
import { useState } from 'react';
import { client, ApiTypes } from '@/prisma/apiclient';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import Link from 'next/link';

type News = ApiTypes["News"];

function ListItem({ news }: { news: News }) {
    return (
        <AccordionItem value={news.id.toString()} className="border border-1 border-b rounded-lg border-red w-full">
            <AccordionTrigger arrow_size="size-10" className="border border-red px-6 text-red-500">
                <div className="flex justify-between w-full">
                    <H3>{news.attributes.title}</H3>
                    <Link href={`/admin/news/${news.id}`}>
                        <Button>Manage</Button>
                    </Link>
                </div>
            </AccordionTrigger>
            <AccordionContent className="border-red gap-4 p-4 text-balance">
                <div className='relative'>
                    <p>{news.attributes.title}</p>
                    <A>{news.attributes.link}</A>
                </div>
            </AccordionContent>
        </AccordionItem>
    );
}




export default function NewsList() {
    const [news, setNews] = useState<News[] | null>(null);

    async function fetchNews() {
        const response = await client.GET("/api/model/rest/news", {})
        if (response.response.status === 200) {
            setNews(response.data!.data);
        } else {
            setNews([]);
        }
    }
    if (news === null)
        fetchNews();

    return (
        <div className="mx-4 mt-4">
            <H2 className="flex justify-between items-center">
                News
                <div>
                    <Link href="/admin/news/create">
                        <Button>Create</Button>
                    </Link>
                    <Button onClick={fetchNews}>Refresh</Button>
                </div>
            </H2>
            <div className="px-4">
                {
                    (news && news.length > 0) ? (
                        <Accordion
                            type="single"
                            collapsible
                            className="w-full space-y-4"
                            defaultValue="item-1"
                        >
                            {news.map((newsItem) => (
                                <ListItem key={newsItem.id} news={newsItem} />
                            ))}
                        </Accordion>
                    ) : (
                        <p>No news found.</p>
                    )
                }
            </div>
        </div>
    );
}
