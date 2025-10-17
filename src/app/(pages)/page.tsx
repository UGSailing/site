import { H2, H4 } from "@/components";
import Carousel, { CarouselItem } from "@/components/carousel";
import { events } from "@/data/events";
import { news } from "@/data/news";
import Link from "next/link";
import { BoardHomePage } from "@/components/boardHomePage";

export interface TeamImages {
    src: string;
    alt: string;
}
const teamImages: TeamImages[] = [
    { src: "/img/board2425.jpg", alt: "Board 2024-2025" },
    { src: "/img/board2425.jpg", alt: "Board 2024-2025" },
];

export default function Home() {

    return (
        <div>
            <Carousel padding={false} opts={{ loop: true }}>
                {
                    teamImages.map((image, index) => (
                        <CarouselItem key={index} className="w-full">
                            <div key={index}>
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    className="w-full h-auto"
                                />
                            </div>
                        </CarouselItem>
                    ))
                }
            </Carousel>
            <div className="font-sans items-center min-h-screen px-6">

                <main className="flex flex-col gap-[32px] row-start-1 items-center sm:items-start">
                    <section>
                        <H2>Intro</H2>

                        We are UGent Sailing, a diverse team of students and young graduates building an autonomous,
                        CO₂-neutral vessel to compete in the Monaco Energy Boat Challenge.

                    </section>
                    <section className="w-full max-w-full">
                        <H2>Calender</H2>

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
                                                        className="bg-gray-600 icon-[material-symbols--calendar-today]"></span>{event.startDate} {event.endDate ? `- ${event.endDate}` : ""}
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
                    </section>
                    <section className="w-full max-w-full">
                        <H2>News</H2>

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
                                                <Link href={item.link} target="_blank" rel="noopener noreferrer"
                                                      className="text-md text-blue-600 mt-2 hover:underline">View
                                                    article <span
                                                        className="icon-[bi--box-arrow-up-right]"></span></Link>
                                            </div>
                                        </div>
                                    </CarouselItem>
                                ))
                            }
                        </Carousel>
                    </section>
                    <section className="w-full max-w-full">
                        <H2>Board</H2>

                        <BoardHomePage/>
                    </section>
                </main>
            </div>
        </div>
    );
}
