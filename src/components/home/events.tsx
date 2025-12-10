import { EventCarousel } from "./eventCarousel";
import prisma from "@/prisma";
import { subDays } from 'date-fns';

export async function EventsSection() {
    const events = await prisma.event.findMany({
        orderBy: {
            startDate: 'asc'
        },
        take: 10,
        where: {
            startDate: {
                gte: subDays(new Date(), 3)
            }
        },
        include: {
            image: true,
        }
    });
    return <EventCarousel events={events} />;
}