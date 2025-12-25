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

type Board = ApiTypes["Board"];

function ListItem({ board }: { board: Board }) {
    return (
        <AccordionItem value={board.id.toString()} className="border border-1 border-b rounded-lg border-red w-full">
            <AccordionTrigger arrow_size="size-10" className="border border-red px-6 text-red-500">
                <div className="flex justify-between w-full">
                    <H3>{board.attributes.name}</H3>
                    <Link href={`/admin/board/${board.id}`}>
                        <Button>Manage</Button>
                    </Link>
                </div>
            </AccordionTrigger>
            <AccordionContent className="border-red gap-4 p-4 text-balance">
                <div className='relative'>
                    {/* <img src={board.attributes.image || "/img/logos/cropped_logo.png"} className="float-right w-full h-full max-w-72 max-h-48 object-contain ml-4 mb-2"></img> */}
                </div>
            </AccordionContent>
        </AccordionItem>
    );
}




export default function BoardList() {
    const [boards, setBoards] = useState<Board[] | null>(null);

    async function fetchBoards() {
        const response = await client.GET("/api/model/rest/board", {})
        if (response.response.status === 200) {
            setBoards(response.data!.data);
        } else {
            setBoards([]);
        }
    }
    if (boards === null)
        fetchBoards();

    return (
        <div className="mx-4 mt-4">
            <H2 className="flex justify-between items-center">Boards
                <div>
                    <Link href="/admin/board/create">
                        <Button>Create</Button>
                    </Link>
                    <Button onClick={fetchBoards}>Refresh</Button>
                </div>
            </H2>
            <div className="px-4">
                {
                    (boards && boards.length > 0) ? (
                        <Accordion
                            type="single"
                            collapsible
                            className="w-full space-y-4"
                            defaultValue="item-1"
                        >
                            {boards.map((board) => (
                                <ListItem key={board.id} board={board} />
                            ))}
                        </Accordion>
                    ) : (
                        <p>No boards found.</p>
                    )
                }
            </div>
        </div>
    );
}
