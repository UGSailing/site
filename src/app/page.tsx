"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useRef } from "react";
import { H2, H4 } from "@/components";
import Carousel, { CarouselItem } from "@/components/carousel";
import { events } from "@/data/events";
import { news } from "@/data/news";
import Link from "next/link";

interface TeamImages {
    src: string;
    alt: string;
}

const teamImages: TeamImages[] = [
    { src: "/img/board2425.jpg", alt: "Board 2024-2025" },
    { src: "/img/board2425.jpg", alt: "Board 2024-2025" },
];

export default function Home() {
    const [hover, setHover] = useState<boolean>(false);
    const teamSlider = useRef<Slider>(null);
    const teamSliderSettings = {
        autoplaySpeed: 5000,
        autoplay: true,
        speed: 1000,
    }
    return (
        <div>
            <div
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                style={{position: "relative"}}
            >
                <span
                    onClick={() => teamSlider?.current?.slickPrev()} 
                    className={`icon-[bi--arrow-left-circle-fill] w-6 h-6 absolute top-1/2 left-4 transform -translate-y-1/2 z-12 bg-white transition-opacity duration-300 ${hover ? 'opacity-100' : 'opacity-0'}`}
                ></span>
                <span
                    onClick={() => teamSlider?.current?.slickNext()} 
                    className={`icon-[bi--arrow-right-circle-fill] w-6 h-6 absolute top-1/2 right-4 transform -translate-y-1/2 z-12 bg-white transition-opacity duration-300 ${hover ? 'opacity-100' : 'opacity-0'}`}
                ></span>
                <Slider ref={teamSlider} {...teamSliderSettings}>
                    {
                        teamImages.map((image, index) => (
                            <div key={index}>
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    className="w-full h-auto"
                                />
                            </div>
                        ))
                    }
                </Slider>
            </div>
            <div className="font-sans items-center justify-items-center min-h-screen px-6">
                
                <main className="flex flex-col gap-[32px] row-start-1 items-center sm:items-start">
                    <section>
                        <H2>Intro</H2>

                        Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
                    </section>
                    <section className="w-full">
                        <H2>Calender</H2>

                        <Carousel>
                            {
                                events.map((event, index) => (
                                    <CarouselItem className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 h-full">
                                        <div key={index} className="p-4 h-full">
                                            <div className="border border-red-500 rounded-lg p-4 w-full h-full flex flex-col justify-between">
                                                <div>
                                                    <H4 className="mb-2 h-15">{event.title}</H4>
                                                    <p className="text-sm text-gray-600 mb-1"><span className="bg-gray-600 icon-[material-symbols--calendar-today]"></span>{event.date}</p>
                                                    <p className="text-sm text-gray-600"><span className="bg-gray-600 icon-[material-symbols--location-on]"></span>{event.location}</p>
                                                </div>
                                                <p className="text-md text-gray-800 mt-2 h-25">{event.description}</p>
                                            </div>
                                        </div>
                                    </CarouselItem>
                                ))
                            }
                        </Carousel>
                    </section>
                    <section className="w-full">
                        <H2>News</H2>

                        <Carousel>
                            {
                                news.map((item, index) => (
                                    <CarouselItem className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 h-full">
                                        <div key={index} className="p-4 h-full">
                                            <div className="border border-red-500 rounded-lg p-4 w-full h-full flex flex-col justify-between">
                                                <div>
                                                    <H4 className="h-28 mb-2">{item.title}</H4>
                                                    <p className="text-sm text-gray-600 mb-1"><span className="bg-gray-600 icon-[material-symbols--calendar-today]"></span>{item.date}</p>
                                                </div>
                                                <Link href={ item.link } target="_blank" rel="noopener noreferrer" className="text-md text-blue-600 mt-2 hover:underline">View article <span className="icon-[bi--box-arrow-up-right]"></span></Link>
                                            </div>
                                        </div>
                                    </CarouselItem>
                                ))
                            }
                        </Carousel>
                    </section>
                    <section className="w-full">
                        <H2>Board</H2>
                        
                    </section>
                </main>
            </div>
        </div>
    );
}

export default Home;
