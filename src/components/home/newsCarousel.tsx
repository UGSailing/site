"use client";
import Carousel, { CarouselItem } from "@/components/carousel";
import Link from "next/link";
import { H4, A } from "@/components";

type News = {
    link: string;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    title: string;
}

export function NewsCarousel({ news }: { news: News[] }) {
    return (
        <Carousel>
            {
                news.map((item, index) => (
                    <CarouselItem key={index}
                        className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 h-full">
                        <div className="p-4 h-full">
                            <div
                                className="border border-red-500 rounded-lg p-4 w-full h-full flex flex-col justify-between">
                                <div>
                                    <H4 className="h-28 mb-2">{item.title}</H4>
                                </div>
                                <A href={item.link}>View Article</A>
                            </div>
                        </div>
                    </CarouselItem>
                ))
            }
        </Carousel>
    )
}