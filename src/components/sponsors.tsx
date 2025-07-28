"use client";
import sponsors from "@/data/sponsors";
import Link from "next/link";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export function Sponsors() {
    const [visibleLogos, setVisibleLogos] = useState(4); // Default to 4 logos per view (fallback for SSR)

    const logosPerView = {
        sm: 2, // Small screens
        md: 3, // Medium screens
        lg: 4, // Large screens
    };

    // Determine the number of logos to show based on screen size
    const getLogosPerView = () => {
        if (window.innerWidth >= 1024) return logosPerView.lg; // Large screens
        if (window.innerWidth >= 768) return logosPerView.md; // Medium screens
        return logosPerView.sm; // Small screens
    };

    useEffect(() => {
        const handleResize = () => {
            setVisibleLogos(getLogosPerView());
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const settings = {
        infinite: true,
        slidesToShow: Math.min(visibleLogos, sponsors.length),
        slidesToScroll: Math.min(visibleLogos, sponsors.length),
        autoplay: visibleLogos < sponsors.length,
        speed: 1000,
        autoplaySpeed: 5000,
        cssEase: "linear"
    }

    return (
        <div>
            <h2 className="text-2xl font-bold text-center my-6">Our Sponsors</h2>
            <div className="h-18 slider-container justify-center">
                <Slider {...settings}>
                    {
                        sponsors?.map((sponsor) => (
                            <Link 
                                href={sponsor.website} 
                                target="_blank" 
                                key={sponsor.name}
                                className="flex flex-col items-center w-1/2 md:w-1/3 lg:w-1/4"
                            >
                                <div className="flex flex-wrap">
                                    <img 
                                        src={sponsor.logo} 
                                        alt={`${sponsor.name} logo`} 
                                        className="max-h-18 w-full object-contain" 
                                    />
                                </div>
                            </Link>
                        ))
                    }
                </Slider>
            </div>
        </div>
    )
}