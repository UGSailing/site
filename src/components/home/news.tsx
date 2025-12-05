import prisma from "@/prisma";
import { NewsCarousel } from "./newsCarousel";

export async function NewsSection() {
    const news = await prisma.news.findMany({
        orderBy: {
            updatedAt: 'desc'
        },
        take: 10,
    });
    return (
        <NewsCarousel news={news} />
    )
}