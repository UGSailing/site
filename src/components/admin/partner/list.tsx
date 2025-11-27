"use client";

import React from 'react';
import { A, Button, H2, H3 } from "@/components"
import { useState } from 'react';
import { client, paths } from '@/prisma/apiclient';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

type Partner = paths["/api/model/rest/partner"]["get"]["responses"][200]["content"]["application/vnd.api+json"]["data"][0];

function ListItem({ partner }: { partner: Partner }) {
    return (
        <AccordionItem value={partner.id.toString()} className="border border-1 border-b rounded-lg border-red w-full">
            <AccordionTrigger arrow_size="size-6" className="border border-red px-6 text-red-500"><H3>{partner.attributes.name}</H3></AccordionTrigger>
            <AccordionContent className="border-red gap-4 p-4 text-balance pb-1">
                <div className='relative'>
                    <img src={partner.attributes.logo} className="float-right w-full h-full max-w-72 max-h-48 object-contain ml-4 mb-2"></img>
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




export default function PartnerList({ partnersProp }: { partnersProp: Partner[] | null }) {
    const [partners, setPartners] = useState<Partner[] | null>(partnersProp || null);

    async function fetchPartners() {
        const response = await client.GET("/api/model/rest/partner", {})
        if (response.response.status === 200) {
            setPartners(response.data!.data);
        } else {
            setPartners([]);
        }
    }

    return (
        <div>
            <H2 className="flex justify-between items-center">Partners
                <Button onClick={fetchPartners}>Refresh</Button>
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
