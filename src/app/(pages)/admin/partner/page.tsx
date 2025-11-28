"use server";

import React from 'react';
import { client, paths } from '@/prisma';
import PartnerList from "@/components/admin/partner/list";
import Form, { type SchemaInfo } from '@/components/form';


type Partner = paths["/api/model/rest/partner"]["get"]["responses"][200]["content"]["application/vnd.api+json"]["data"][0];

export default async function Partner() {
    const response = await client.GET("/api/model/rest/partner", {})
    const partners = response.response.status === 200 ? response.data!.data : null;
    return (
        <div>
            <PartnerList partnersProp={partners} />
        </div>
    );
}
