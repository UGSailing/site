"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useRef } from "react";

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
                    className={`icon-[bi--arrow-left-circle-fill] w-6 h-6 absolute top-1/2 left-4 transform -translate-y-1/2 z-12 bg-white hover:bg-opacity-100 bg-opacity-75 transition-opacity duration-300 ${hover ? 'opacity-100' : 'opacity-0'}`}
                ></span>
                <span
                    onClick={() => teamSlider?.current?.slickNext()} 
                    className={`icon-[bi--arrow-right-circle-fill] w-6 h-6 absolute top-1/2 right-4 transform -translate-y-1/2 z-12 bg-white hover:bg-opacity-100 bg-opacity-75 transition-opacity duration-300 ${hover ? 'opacity-100' : 'opacity-0'}`}
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
                        <h2 className="text-3xl font-bold mb-4">
                            Intro
                        </h2>
                        Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
                    </section>
                    <section>
                        <h2 className="text-3xl font-bold mb-4">
                            Calender
                        </h2>
                        To be implemented
                    </section>
                    <section>
                        <h2 className="text-3xl font-bold mb-4">
                            News
                        </h2>
                        To be implemented
                    </section>
                    <section>
                        <h2 className="text-3xl font-bold mb-4">
                            Board
                        </h2>
                        To be implemented
                    </section>
                </main>
            </div>
        </div>
    );
}
