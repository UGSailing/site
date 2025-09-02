"use client";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi
} from "@/components/ui/carousel"
import { useState, useEffect } from "react";
import { events, type EventType } from "@/data/events";
import { EventCard } from "@/components/eventCard";
import { PreviousButton, NextButton } from "./carouselUtil";

export default function EventCarousel() {
    const [api, setApi] = useState<CarouselApi>()

    useEffect(() => {
        if (!api) {
          return
        }
      }, [api])
    return (
        <div>
            <Carousel
                opts={{
                    align: "start",
                    watchDrag: false,
                }}
                className="w-full px-2 py-2 relative"
                setApi={setApi}
            >
                <CarouselContent>
                    {
                        events.map((event) => <CarouselItem className="md:basis-1/3" key={event.id}><EventCard event={event}></EventCard></CarouselItem>)
                    }
                </CarouselContent>
                <PreviousButton previousEvent={(e) => api?.scrollPrev()}></PreviousButton>
                <NextButton nextEvent={(e) => api?.scrollNext()}></NextButton>
            </Carousel>
        </div>
    )
}