import prisma from "@/prisma";
import { PartnerCarousel } from "./partnerCarousel";
import { connection } from "next/server";

export async function Partners() {
    // Render at incoming request
    await connection()

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
