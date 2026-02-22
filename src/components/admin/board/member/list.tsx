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

type Member = ApiTypes["BoardMember"];

function ListItem({ member }: { member: Member }) {
    return (
        <AccordionItem value={member.id.toString()} className="border border-1 border-b rounded-lg border-red w-full">
            <AccordionTrigger arrow_size="size-10" className="border border-red px-6 text-red-500">
                <div className="flex justify-between w-full">
                    <H3>{member.attributes.name}</H3>
                    <Link href={`/admin/board/member/${member.id}`}>
                        <Button>Manage</Button>
                    </Link>
                </div>
            </AccordionTrigger>
            <AccordionContent className="border-red gap-4 p-4 text-balance">
                <div className='relative'>
                    {/* <img src={member.attributes.image || "/img/logos/cropped_logo.png"} className="float-right w-full h-full max-w-72 max-h-48 object-contain ml-4 mb-2"></img> */}
                </div>
            </AccordionContent>
        </AccordionItem>
    );
}




export default function MemberList() {
    const [members, setMembers] = useState<Member[] | null>(null);

    async function fetchMembers() {
        const response = await client.GET("/api/model/rest/boardMember", {})
        if (response.response.status === 200) {
            setMembers(response.data!.data);
        } else {
            setMembers([]);
        }
    }
    if (members === null)
        fetchMembers();

    return (
        <div className="mx-4 mt-4">
            <H2 className="flex justify-between items-center">Members
                <div>
                    <Link href="/admin/board/member/create">
                        <Button>Create</Button>
                    </Link>
                    <Button onClick={fetchMembers}>Refresh</Button>
                </div>
            </H2>
            <div className="px-4">
                {
                    (members && members.length > 0) ? (
                        <Accordion
                            type="single"
                            collapsible
                            className="w-full space-y-4"
                            defaultValue="item-1"
                        >
                            {members.map((member) => (
                                <ListItem key={member.id} member={member} />
                            ))}
                        </Accordion>
                    ) : (
                        <p>No members found.</p>
                    )
                }
            </div>
        </div>
    );
}
