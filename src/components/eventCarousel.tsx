"use client";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import { events, type EventType } from "@/data/events";
import { EventCard } from "@/components/eventCard";

export default function EventCarousel() {
    return (
        <div>
            <Carousel
                opts={{
                    align: "start",
                    watchDrag: false,
                }}
                className="w-full position-relative"
            >
                <CarouselContent>
                    {
                        events.map((event) => <CarouselItem className="md:basis-1/3"><EventCard key={event.id} event={event}></EventCard></CarouselItem>)
                    }
                </CarouselContent>
            </Carousel>
        </div>
    )
}