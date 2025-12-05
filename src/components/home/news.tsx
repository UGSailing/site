"use client";
import Carousel, { CarouselItem } from "@/components/carousel";
import { news } from "@/data/news";
import Link from "next/link";
import { H4 } from "@/components";

export function NewsSection() {
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
                                    <p className="text-sm text-gray-600 mb-1"><span
                                        className="bg-gray-600 icon-[material-symbols--calendar-today]"></span>{item.date}
                                    </p>
                                </div>
                                <Link href={item.link} target="_blank" rel="noopener noreferrer" className="text-md text-blue-600 mt-2 hover:underline">{"viewArticle"}
                                    <span className="icon-[bi--box-arrow-up-right]"></span>
                                </Link>
                            </div>
                        </div>
                    </CarouselItem>
                ))
            }
        </Carousel>
    )
}