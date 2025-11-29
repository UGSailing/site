"use client";

import React from 'react';
import { client, ApiTypes } from '@/prisma/apiclient';
import PartnerList from "@/components/admin/partner/list";


type Partner = ApiTypes["Partner"];

export default async function Partner() {
    const response = await client.GET("/api/model/rest/partner", {})
    const partners = response.response.status === 200 ? response.data!.data : null;
    return (
        <div>
            <PartnerList partnersProp={partners} />
        </div>
    );
}
