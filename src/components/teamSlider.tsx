"use client";
import Slider from "react-slick";
import { useRef, useState } from "react";

export interface TeamImages {
    src: string;
    alt: string;
}

export function TeamSlider({ teamImages }: {teamImages: TeamImages[]}) {
    const [hover, setHover] = useState<boolean>(false);
    const teamSlider = useRef<Slider>(null);
    const teamSliderSettings = {
        autoplaySpeed: 5000,
        autoplay: true,
        speed: 1000,
    }

    return (
        <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{ position: "relative" }}
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
        </div>);
}