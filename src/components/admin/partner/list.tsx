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

type Partner = ApiTypes["Partner"];

function ListItem({ partner }: { partner: Partner }) {
    return (
        <AccordionItem value={partner.id.toString()} className="border border-1 border-b rounded-lg border-red w-full">
            <AccordionTrigger arrow_size="size-10" className="border border-red px-6 text-red-500">
                <div className="flex justify-between w-full">
                    <H3>{partner.attributes.name}</H3>
                    <Link href={`/admin/partner/${partner.id}`}>
                        <Button>Manage</Button>
                    </Link>
                </div>
            </AccordionTrigger>
            <AccordionContent className="border-red gap-4 p-4 text-balance">
                <div className='relative'>
                    {/* <img src={partner.attributes.logoId} className="float-right w-full h-full max-w-72 max-h-48 object-contain ml-4 mb-2"></img> */}
                    {
                        partner.attributes.active ? (
                            <p className="text-green-700 font-bold">Active Partner</p>
                        ) : (
                            <p className="text-red-500 font-bold">Inactive Partner</p>
                        )
                    }
                    <A href={partner.attributes.url}>Site</A>
                    <p>{partner.attributes.description}</p>
                </div>
            </AccordionContent>
        </AccordionItem>
    );
}




export default function PartnerList() {
    const [partners, setPartners] = useState<Partner[] | null>(null);

    async function fetchPartners() {
        const response = await client.GET("/api/model/rest/partner", {})
        if (response.response.status === 200) {
            setPartners(response.data!.data);
        } else {
            setPartners([]);
        }
    }
    if (partners === null)
        fetchPartners();

    return (
        <div className="mx-4 mt-4">
            <H2 className="flex justify-between items-center">
                Partners
                <div>
                    <Link href="/admin/partner/create">
                        <Button>Create</Button>
                    </Link>
                    <Button onClick={fetchPartners}>Refresh</Button>
                </div>
            </H2>
            <div className="px-4">
                {
                    (partners && partners.length > 0) ? (
                        <Accordion
                            type="single"
                            collapsible
                            className="w-full space-y-4"
                            defaultValue="item-1"
                        >
                            {partners.map((partner) => (
                                <ListItem key={partner.id} partner={partner} />
                            ))}
                        </Accordion>
                    ) : (
                        <p>No partners found.</p>
                    )
                }
            </div>
        </div>
    );
}
