"use client";
import {
    Carousel,
    CarouselContent,
    type CarouselApi
} from "@/components/ui/carousel"
import { useState, useEffect } from "react";
import { PreviousButton, NextButton } from "./carouselUtil";

export { CarouselItem } from "@/components/ui/carousel";
export default function MyCarousel({ children }: { children?: React.ReactNode }) {
    const [api, setApi] = useState<CarouselApi>()

    useEffect(() => {
        if (!api) {
          return
        }
      }, [api])
    return (
        <Carousel
            opts={{
                align: "start",
                watchDrag: false,
            }}
            className="w-full px-2 py-2 relative"
            setApi={setApi}
        >
            <CarouselContent>
                { children }
            </CarouselContent>
            <PreviousButton previousEvent={(e) => api?.scrollPrev()}></PreviousButton>
            <NextButton nextEvent={(e) => api?.scrollNext()}></NextButton>
        </Carousel>
    )
}