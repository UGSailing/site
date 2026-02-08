"use client";

import React from 'react';
import { Button, H2, H3 } from "@/components"
import { useState } from 'react';
import { client, ApiTypes } from '@/prisma/apiclient';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import Link from 'next/link';

type Position = ApiTypes["Position"];

function ListItem({ position }: { position: Position }) {
    return (
        <AccordionItem value={position.id.toString()} className="border border-1 border-b rounded-lg border-red w-full">
            <AccordionTrigger arrow_size="size-10" className="border border-red px-6 text-red-500">
                <div className="flex justify-between w-full">
                    <H3>{position.attributes.name}</H3>
                    <Link href={`/admin/position/${position.id}`}>
                        <Button>Manage</Button>
                    </Link>
                </div>
            </AccordionTrigger>
            <AccordionContent className="border-red gap-4 p-4 text-balance">
                <div className='relative'>
                    {/* <img src={position.attributes.image || "/img/logos/cropped_logo.png"} className="float-right w-full h-full max-w-72 max-h-48 object-contain ml-4 mb-2"></img> */}
                    
                    <p>{position.attributes.description}</p>
                    <p>Email: {position.attributes.email}</p>
                    <p>Index: {position.attributes.index}</p>
                </div>
            </AccordionContent>
        </AccordionItem>
    );
}




export default function PositionList() {
    const [positions, setPositions] = useState<Position[] | null>(null);

    async function fetchPositions() {
        const response = await client.GET("/api/model/rest/position", {})
        if (response.response.status === 200) {
            setPositions(response.data!.data);
        } else {
            setPositions([]);
        }
    }
    if (positions === null)
        fetchPositions();

    return (
        <div className="mx-4 mt-4">
            <H2 className="flex justify-between items-center">Positions
                <div>
                    <Link href="/admin/position/create">
                        <Button>Create</Button>
                    </Link>
                    <Button onClick={fetchPositions}>Refresh</Button>
                </div>
            </H2>
            <div className="px-4">
                {
                    (positions && positions.length > 0) ? (
                        <Accordion
                            type="single"
                            collapsible
                            className="w-full space-y-4"
                            defaultValue="item-1"
                        >
                            {positions.map((position) => (
                                <ListItem key={position.id} position={position} />
                            ))}
                        </Accordion>
                    ) : (
                        <p>No positions found.</p>
                    )
                }
            </div>
        </div>
    );
}
