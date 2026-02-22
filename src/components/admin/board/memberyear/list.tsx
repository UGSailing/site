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

type BoardMemberYear = ApiTypes["BoardMemberYear"];

function ListItem({ boardMember }: { boardMember: BoardMemberYear }) {
    return (
        <AccordionItem value={boardMember.id.toString()} className="border border-1 border-b rounded-lg border-red w-full">
            <AccordionTrigger arrow_size="size-10" className="border border-red px-6 text-red-500">
                <div className="flex justify-between w-full">
                    <H3>{boardMember.id}</H3>
                    <Link href={`/admin/board/memberyear/${boardMember.id}`}>
                        <Button>Manage</Button>
                    </Link>
                </div>
            </AccordionTrigger>
            <AccordionContent className="border-red gap-4 p-4 text-balance">
                <div className='relative'>
                    {/* <img src={boardMember.attributes.image || "/img/logos/cropped_logo.png"} className="float-right w-full h-full max-w-72 max-h-48 object-contain ml-4 mb-2"></img> */}
                    <Link href={`/admin/board/member/${boardMember.attributes.boardMemberId}`}>{boardMember.attributes.boardMemberId}</Link>
                    <Link href={`/admin/board/${boardMember.attributes.boardId}`}>{boardMember.attributes.boardId}</Link>
                    <Link href={`/uploads/${boardMember.attributes.imageId}`}>{boardMember.attributes.imageId}</Link>
                    <p>{boardMember.attributes.index}</p>
                </div>
            </AccordionContent>
        </AccordionItem>
    );
}




export default function BoardMemberYearList() {
    const [boardMembers, setBoardMembers] = useState<BoardMemberYear[] | null>(null);

    async function fetchBoardMembers() {
        const response = await client.GET("/api/model/rest/boardMemberYear", {})
        if (response.response.status === 200) {
            setBoardMembers(response.data!.data);
        } else {
            setBoardMembers([]);
        }
    }
    if (boardMembers === null)
        fetchBoardMembers();

    return (
        <div className="mx-4 mt-4">
            <H2 className="flex justify-between items-center">Board Members
                <div>
                    <Link href="/admin/board/memberyear/create">
                        <Button>Create</Button>
                    </Link>
                    <Button onClick={fetchBoardMembers}>Refresh</Button>
                </div>
            </H2>
            <div className="px-4">
                {
                    (boardMembers && boardMembers.length > 0) ? (
                        <Accordion
                            type="single"
                            collapsible
                            className="w-full space-y-4"
                            defaultValue="item-1"
                        >
                            {boardMembers.map((boardMember) => (
                                <ListItem key={boardMember.id} boardMember={boardMember} />
                            ))}
                        </Accordion>
                    ) : (
                        <p>No board members found.</p>
                    )
                }
            </div>
        </div>
    );
}
