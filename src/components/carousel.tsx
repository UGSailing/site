"use client";
import {
    Carousel as ChadcnCarousel,
    CarouselContent,
    type CarouselApi
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const arrowSizes: Record<string, string> = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
    xl: "w-12 h-12",
}

const defaultSize = "md"
const spacingSizes: Record<string, [string, string]> = {
    sm: ["left-1", "right-1"],
    md: ["left-2", "right-2"],
    lg: ["left-2", "right-2"],
    xl: ["left-3", "right-3"],
}

const widthSizes: Record<string, string> = {
    sm: "w-18",
    md: "w-22",
    lg: "w-26",
    xl: "w-30",
}

function NextButton({ nextEvent, size }: { nextEvent?: (e: React.MouseEvent<HTMLElement>) => void, size?: string }) {
    size = size ?? defaultSize
    return (
        <div onClick={ nextEvent } className={
            cn(
                "h-full absolute top-1/2 right-0 transform -translate-y-1/2 z-12 hover:opacity-100 transition-opacity opacity-20 duration-300 cursor-pointer",
                widthSizes[size]
            )
        }>
            <div className="bg-white w-full h-full opacity-20"></div>
            <div className={
                cn(
                    "bg-white absolute top-1/2 transform -translate-y-1/2 rounded-full",
                    arrowSizes[size],
                    spacingSizes[size][1]
                )
            }>
                <span className={
                    cn(
                        "icon-[bi--arrow-right-circle-fill] bg-red-500",
                        arrowSizes[size]
                    )
                }></span>
            </div>
        </div>
    )
}

function PreviousButton({ previousEvent, size }: { previousEvent?: (e: React.MouseEvent<HTMLElement>) => void, size?: string }) {
    size = size ?? defaultSize
    return (
        <div onClick={ previousEvent } className={
            cn(
                "h-full absolute top-1/2 left-0 transform -translate-y-1/2 z-12 hover:opacity-100 transition-opacity opacity-20 duration-300 cursor-pointer",
                widthSizes[size]
            )
        }>
            <div className="bg-white w-full h-full opacity-20"></div>
            <div className={
                cn(
                    "bg-white absolute top-1/2 transform -translate-y-1/2 rounded-full",
                    arrowSizes[size],
                    spacingSizes[size][0]
                )
            }>
                <span className={
                    cn(
                        "icon-[bi--arrow-left-circle-fill] bg-red-500",
                        arrowSizes[size]
                    )
                }></span>
            </div>
        </div>
    )
}

export { CarouselItem } from "@/components/ui/carousel";
export default function Carousel({ children, buttonSettings }: { children?: React.ReactNode, buttonSettings?: { size: string } }) {
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
            <PreviousButton previousEvent={() => api?.scrollPrev() } {...buttonSettings}></PreviousButton>
            <NextButton nextEvent={() => api?.scrollNext()} {...buttonSettings}></NextButton>
        </ChadcnCarousel>
    )
}