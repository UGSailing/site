import MyCarousel, { CarouselItem } from "@/components/myCarousel";
import { Metadata } from "next";
import { events } from "@/data/events";
import { EventCard } from "@/components/eventCard";
import { generations } from "@/data/generation";
import { GenerationCard } from "@/components/genCard";

export const metadata: Metadata = {
    title: "Timeline",
    description: "Timeline of UGent Sailing",
}

const Timeline = () => {
    
    return (
        <div className="font-sans items-center justify-items-center min-h-screen px-6">
            <main className="w-full flex flex-col gap-[32px] row-start-1 items-center sm:items-start">
                <h1 className="scroll-m-20 w-full text-center text-4xl font-extrabold tracking-tight text-balance">
                    Events
                </h1>
                <MyCarousel key="timeline-carousel">
                    { events.map((event) => <CarouselItem className="md:basis-1/3" key={event.id}><EventCard event={event}></EventCard></CarouselItem>) }
                </MyCarousel>
                <h1 className="scroll-m-20 w-full text-center text-4xl font-extrabold tracking-tight text-balance">
                    Our Ship
                </h1>
                <MyCarousel key="ship-carousel">
                    { generations.map((generation) => <CarouselItem className="md:basis-1/3" key={generation.name}><GenerationCard generation={generation}></GenerationCard></CarouselItem>) }
                </MyCarousel>
            </main>
        </div>
    )
};

export default Timeline;