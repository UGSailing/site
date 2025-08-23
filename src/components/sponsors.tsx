"use client";
import sponsors from "@/data/sponsors";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export function Sponsors() {
    const visibleLogos = sponsors.length

    const settings = {
        infinite: true,
        slidesToShow: Math.min(visibleLogos, 4),
        slidesToScroll: Math.min(visibleLogos, 4),
        autoplay: visibleLogos < sponsors.length,
        speed: 1000,
        autoplaySpeed: 5000,
        cssEase: "linear",
        arrows:false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: Math.min(visibleLogos, 3),
                    slidesToScroll: Math.min(visibleLogos, 3),
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: Math.min(visibleLogos, 2),
                    slidesToScroll: Math.min(visibleLogos, 2),
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
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
                                rel="noopener noreferrer"
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