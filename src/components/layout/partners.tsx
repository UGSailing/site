"use server";
import { ApiTypes } from "@/prisma/apiclient";
import prisma from "@/prisma";
import { PartnerCarousel } from "./partnerCarousel";

type ExtendedPartner = ApiTypes["Partner"] & {
    attributes: ApiTypes["Partner"]["attributes"] & {
        logo?: ApiTypes["Media"] | null;
    }
};

export async function Partners() {
    const partners = await prisma.partner.findMany({
        include: {
            logo: true,
        }
    });

    return (
        <PartnerCarousel partners={partners} />
    )
}