"use client";
import {
    Carousel as ChadcnCarousel,
    CarouselContent,
    type CarouselApi
} from "@/components/ui/carousel"
import { useState, useEffect } from "react";

function NextButton({ nextEvent, width, arrowSize }: { nextEvent?: (e: any) => void, width?: number, arrowSize?: number }) {
    arrowSize = arrowSize ?? 12
    const sizeClasses = `w-${arrowSize} h-${arrowSize}`
    return (
        <div onClick={ nextEvent } className={`w-${width ?? 30} h-full absolute top-1/2 right-0 transform -translate-y-1/2 z-12 hover:opacity-100 transition-opacity opacity-20 duration-300 cursor-pointer`}>
            <div className="bg-white w-full h-full opacity-20"></div>
            <div className={`bg-white ${sizeClasses} absolute top-1/2 transform -translate-y-1/2 right-4 rounded-full`}>
                <span className={`icon-[bi--arrow-right-circle-fill] ${sizeClasses} bg-red-500`}></span>
            </div>
        </div>
    )
}

function PreviousButton({ previousEvent, width, arrowSize }: { previousEvent?: (e: any) => void, width?: number, arrowSize?: number }) {
    arrowSize = arrowSize ?? 12
    console.log(arrowSize);
    const sizeClasses = `w-${arrowSize} h-${arrowSize}`
    return (
        <div onClick={ previousEvent } className={`w-${width ?? 30} h-full absolute top-1/2 left-0 transform -translate-y-1/2 z-12 hover:opacity-100 transition-opacity opacity-20 duration-300 cursor-pointer`}>
            <div className="bg-white w-full h-full opacity-20"></div>
            <div className={`bg-white ${sizeClasses} absolute top-1/2 transform -translate-y-1/2 left-4 rounded-full`}>
                <span className={`icon-[bi--arrow-left-circle-fill] ${sizeClasses} bg-red-500`}></span>
            </div>
        </div>
    )
}

export { CarouselItem } from "@/components/ui/carousel";
export default function Carousel({ children, buttonSettings }: { children?: React.ReactNode, buttonSettings: { width?: number, arrowSize?: number } }) {
    const [api, setApi] = useState<CarouselApi>()

    useEffect(() => {
        if (!api) {
          return
        }
      }, [api])
    return (
        <ChadcnCarousel
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
            <PreviousButton previousEvent={(e) => api?.scrollPrev() } {...buttonSettings}></PreviousButton>
            <NextButton nextEvent={(e) => api?.scrollNext()} {...buttonSettings}></NextButton>
        </ChadcnCarousel>
    )
}