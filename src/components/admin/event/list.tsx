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

type Event = ApiTypes["Event"];

function ListItem({ event }: { event: Event }) {
    return (
        <AccordionItem value={event.id.toString()} className="border border-1 border-b rounded-lg border-red w-full">
            <AccordionTrigger arrow_size="size-10" className="border border-red px-6 text-red-500">
                <div className="flex justify-between w-full">
                    <H3>{event.attributes.title}</H3>
                    <Link href={`/admin/event/${event.id}`}>
                        <Button>Manage</Button>
                    </Link>
                </div>
            </AccordionTrigger>
            <AccordionContent className="border-red gap-4 p-4 text-balance">
                <div className='relative'>
                    {/* <img src={event.attributes.image || "/img/logos/cropped_logo.png"} className="float-right w-full h-full max-w-72 max-h-48 object-contain ml-4 mb-2"></img> */}
                    {
                        Date.parse(event.attributes.startDate) > new Date().getTime() ? (
                            <p className="text-green-700 font-bold">Future Event</p>
                        ) : (
                            <p className="text-red-500 font-bold">Passed Event</p>
                        )
                    }
                    <p>{event.attributes.location}</p>
                    <p>{event.attributes.intro}</p>
                    <p>{event.attributes.startDate} - {event.attributes.endDate}</p>
                </div>
            </AccordionContent>
        </AccordionItem>
    );
}




export default function EventList() {
    const [events, setEvents] = useState<Event[] | null>(null);

    async function fetchEvents() {
        const response = await client.GET("/api/model/rest/event", {})
        if (response.response.status === 200) {
            setEvents(response.data!.data);
        } else {
            setEvents([]);
        }
    }
    if (events === null)
        fetchEvents();

    return (
        <div className="mx-4 mt-4">
            <H2 className="flex justify-between items-center">Events
                <Button onClick={fetchEvents}>Refresh</Button>
            </H2>
            <div className="px-4">
                {
                    (events && events.length > 0) ? (
                        <Accordion
                            type="single"
                            collapsible
                            className="w-full space-y-4"
                            defaultValue="item-1"
                        >
                            {events.map((event) => (
                                <ListItem key={event.id} event={event} />
                            ))}
                        </Accordion>
                    ) : (
                        <p>No events found.</p>
                    )
                }
            </div>
        </div>
    );
}
