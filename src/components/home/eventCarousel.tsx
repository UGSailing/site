"use client";

import { H4 } from "..";
import Carousel, { CarouselItem } from "../carousel";

type Event = {
    image: {
        height: number | null;
        id: string;
        width: number | null;
        size: number;
        createdAt: Date;
        updatedAt: Date;
        filename: string;
        filepath: string;
        mimetype: string;
        uploadedById: string | null;
    } | null;
} & {
    id: number;
    location: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    startDate: Date;
    endDate: Date;
    intro: string;
    description: string | null;
    registration: number | null;
    imageId: string | null;
}

export function EventCarousel( { events }: { events: Event[] }) {
    return (
        <Carousel>
            {
                events.map((event, index) => (
                    <CarouselItem key={index}
                        className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 h-full">
                        <div className="p-4 h-full">
                            <div
                                className="border border-red-500 rounded-lg p-4 w-full h-full flex flex-col justify-between">
                                <div>
                                    <H4 className="mb-2 h-15">{event.title}</H4>
                                    <p className="text-sm text-gray-600 mb-1"><span
                                        className="bg-gray-600 icon-[material-symbols--calendar-today]"></span>{event.startDate.toLocaleDateString()} {event.endDate ? `- ${event.endDate.toLocaleDateString()}` : ""}
                                    </p>
                                    <p className="text-sm text-gray-600 h-8"><span
                                        className="bg-gray-600 icon-[material-symbols--location-on]"></span>{event.location}
                                    </p>
                                </div>
                                <p className="text-md text-gray-800 mt-2 h-25">{event.intro}</p>
                            </div>
                        </div>
                    </CarouselItem>
                ))
            }
        </Carousel>
    )
}