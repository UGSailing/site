import Carousel, { CarouselItem } from "@/components/carousel";
import { Metadata } from "next";
import { EventCard, FutureEventCard } from "@/components/eventCard";
import { generations } from "@/data/generation";
import { GenerationCard } from "@/components/genCard";
import { H1 } from "@/components";
import { parse } from 'date-fns';
import prisma from "@/prisma";

export const metadata: Metadata = {
    title: "Timeline",
    description: "Timeline of UGent Sailing",
}

type Event = {
    image: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        filename: string;
        filepath: string;
        mimetype: string;
        size: number;
        width: number | null;
        height: number | null;
        uploadedById: string | null;
    } | null;
} & {
    endDate: Date;
    startDate: Date;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    location: string;
    intro: string;
    description: string | null;
    registration: number | null;
    imageId: string | null;
}

function getNextEventIndex(events: Event[]) {
    const now = new Date();
    const dates = events.map(event => event.endDate ?? event.startDate);
    const deltas = dates.map(date => date.getTime() - now.getTime());
    // index of smallest delta
    const nextindex = deltas.indexOf(Math.min(...deltas.filter(d => d >= 0))) || -1;
    if (nextindex !== -1) return nextindex;
    else return Math.max(deltas.length - 1, 0); // default to last if no upcoming event
}

const Timeline = async () => {
    const events = await prisma.event.findMany({
        orderBy: {
            startDate: 'asc',
        },
        include: {
            image: true,
        }
    });
    return (
        <div className="mt-5 font-sans items-center justify-items-center min-h-screen px-6">
            <main className="w-full flex flex-col gap-[32px] row-start-1 items-center sm:items-start">
                <H1 className="text-center w-full">Events</H1>
                <Carousel startIndex={getNextEventIndex(events)} buttonSettings={{ size: "xl" }} key="timeline-carousel">
                    {
                        events.map((event) => (
                            <CarouselItem className="md:basis-1/3" key={event.id}>
                                <EventCard event={event}></EventCard>
                            </CarouselItem>)
                        )
                    }
                    <CarouselItem className="md:basis-1/3" key="future-events">
                        <FutureEventCard></FutureEventCard>
                    </CarouselItem>)
                </Carousel>
                <H1 className="text-center w-full">Our Ship</H1>
                <Carousel buttonSettings={{ size: "xl" }} key="ship-carousel">
                    {generations.map((generation) => <CarouselItem className="md:basis-1/3" key={generation.name}><GenerationCard generation={generation}></GenerationCard></CarouselItem>)}
                </Carousel>
            </main>
        </div>
    )
};

export default Timeline;