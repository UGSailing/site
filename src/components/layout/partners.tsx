"use server";
import prisma from "@/prisma";
import { PartnerCarousel } from "./partnerCarousel";

export async function Partners() {
    const partners = await prisma.partner.findMany({
        include: {
            logo: true,
        },
        where: {
            active: true,
        }
    });

    return (
        <PartnerCarousel partners={partners} />
    )
}