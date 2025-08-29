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
        autoplay: true
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
            <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
                
                <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                    
                </main>
            </div>
        </div>
    );
}
