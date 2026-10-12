"use client";

import {
    Carousel as EmblaCarousel,
    CarouselContent,
    type CarouselApi,
    type CarouselOptions,
    type CarouselPlugin,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const arrowSizes: Record<string, string> = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
    xl: "w-12 h-12",
};
const defaultSize = "md";

const spacingSizes: Record<string, [string, string]> = {
    sm: ["left-1", "right-1"],
    md: ["left-2", "right-2"],
    lg: ["left-2", "right-2"],
    xl: ["left-3", "right-3"],
};

const widthSizes: Record<string, string> = {
    sm: "w-18",
    md: "w-22",
    lg: "w-26",
    xl: "w-30",
};

function ArrowButton({
    direction, onClick, disabled, size,
}: {
    direction: "prev" | "next";
    onClick: () => void;
    disabled: boolean;
    size: string;
}) {
    const isNext = direction === "next";
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            aria-label={isNext ? "Next slide" : "Previous slide"}
            className={cn(
                "h-full absolute top-1/2 -translate-y-1/2 z-12",
                "opacity-20 hover:opacity-100 transition-opacity duration-300",
                "disabled:opacity-0 disabled:pointer-events-none",
                isNext ? "right-0" : "left-0",
                widthSizes[size],
            )}
        >
            <div className="bg-white w-full h-full opacity-20"></div>
            <div className={cn(
                "bg-white absolute top-1/2 -translate-y-1/2 rounded-full",
                arrowSizes[size],
                spacingSizes[size][isNext ? 1 : 0],
            )}>
                <span className={cn(
                    isNext ? "icon-[bi--arrow-right-circle-fill]" : "icon-[bi--arrow-left-circle-fill]",
                    "bg-red-500",
                    arrowSizes[size],
                )}></span>
            </div>
        </button>
    );
}

export { CarouselItem } from "@/components/ui/carousel";

export default function Carousel({
    children,
    buttonSettings,
    padding = true,
    opts = {},
    plugins = [],
    startIndex = 0,
}: {
    children?: React.ReactNode;
    buttonSettings?: { size: string };
    padding?: boolean;
    opts?: CarouselOptions;
    plugins?: CarouselPlugin;
    startIndex?: number;
}) {
    const [api, setApi] = useState<CarouselApi>();
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    useEffect(() => {
        if (!api) return;
        const onSelect = () => {
            setCanScrollPrev(api.canScrollPrev());
            setCanScrollNext(api.canScrollNext());
        };
        onSelect();
        api.on("select", onSelect);
        api.on("reInit", onSelect);
        // can't use startIndex in opts because of jumping behavior
        api.scrollTo(startIndex, false);
        return () => {
            api.off("select", onSelect);
            api.off("reInit", onSelect);
        };
    }, [api, startIndex]);

    return (
        <EmblaCarousel
            opts={{ align: "start", watchDrag: false, ...opts }}
            plugins={[...plugins]}
            className={cn("w-full relative", padding && "px-2 py-2")}
            setApi={setApi}
        >
            <CarouselContent>{children}</CarouselContent>
            <ArrowButton direction="prev" onClick={() => api?.scrollPrev()} disabled={!canScrollPrev} size={buttonSettings?.size ?? defaultSize} />
            <ArrowButton direction="next" onClick={() => api?.scrollNext()} disabled={!canScrollNext} size={buttonSettings?.size ?? defaultSize} />
        </EmblaCarousel>
    );
}