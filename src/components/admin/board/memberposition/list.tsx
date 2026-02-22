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

type MemberPosition = ApiTypes["BoardMemberPosition"];

function ListItem({ boardMemberPosition }: { boardMemberPosition: MemberPosition }) {
    return (
        <AccordionItem value={boardMemberPosition.id.toString()} className="border border-1 border-b rounded-lg border-red w-full">
            <AccordionTrigger arrow_size="size-10" className="border border-red px-6 text-red-500">
                <div className="flex justify-between w-full">
                    <H3>{boardMemberPosition.id}</H3>
                    <Link href={`/admin/board/memberposition/${boardMemberPosition.id}`}>
                        <Button>Manage</Button>
                    </Link>
                </div>
            </AccordionTrigger>
            <AccordionContent className="border-red gap-4 p-4 text-balance">
                <div className='relative'>
                    <p>Position ID: {boardMemberPosition.attributes.positionId}</p>
                    <p>Board Member Year ID: {boardMemberPosition.attributes.boardMemberYearId}</p>
                </div>
            </AccordionContent>
        </AccordionItem>
    );
}




export default function BoardMemberPositionList() {
    const [boardMemberPositions, setBoardMemberPositions] = useState<MemberPosition[] | null>(null);

    async function fetchBoardMemberPositions() {
        const response = await client.GET("/api/model/rest/boardMemberPosition", {})
        if (response.response.status === 200) {
            setBoardMemberPositions(response.data!.data);
        } else {
            setBoardMemberPositions([]);
        }
    }
    if (boardMemberPositions === null)
        fetchBoardMemberPositions();

    return (
        <div className="mx-4 mt-4">
            <H2 className="flex justify-between items-center">Board Member Positions
                <div>
                    <Link href="/admin/board/memberposition/create">
                        <Button>Create</Button>
                    </Link>
                    <Button onClick={fetchBoardMemberPositions}>Refresh</Button>
                </div>
            </H2>
            <div className="px-4">
                {
                    (boardMemberPositions && boardMemberPositions.length > 0) ? (
                        <Accordion
                            type="single"
                            collapsible
                            className="w-full space-y-4"
                            defaultValue="item-1"
                        >
                            {boardMemberPositions.map((boardMemberPosition) => (
                                <ListItem key={boardMemberPosition.id} boardMemberPosition={boardMemberPosition} />
                            ))}
                        </Accordion>
                    ) : (
                        <p>No board member positions found.</p>
                    )
                }
            </div>
        </div>
    );
}
