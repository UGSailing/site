import prisma from "@/prisma";
import { PartnerCarousel, HeadPartner } from "./partnerCarousel";
import { connection } from "next/server";
import { H2, H4 } from "..";

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
        <div className="mx-6">
            <H2 className="mb-6 pt-10">Our Partners</H2>
            <H4>Head Partners</H4>
            <HeadPartner partners={partners.filter((p) => p.isHead)} />
            <H4 className="mt-6">Partners</H4>
            <PartnerCarousel partners={partners.filter((p) => !p.isHead)} />
        </div>
    )
}
