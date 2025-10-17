"use client";
import { partners } from "@/data/partners";
import Link from "next/link";
import Carousel, { CarouselItem } from "@/components/carousel";
import Autoplay from 'embla-carousel-autoplay';
import { H2 } from ".";

export function Partners() {
    const visibleLogos = partners.length

    const settings = {
        infinite: true,
        slidesToShow: Math.min(visibleLogos, 4),
        slidesToScroll: Math.min(visibleLogos, 4),
        autoplay: visibleLogos < partners.length,
        speed: 1000,
        autoplaySpeed: 5000,
        cssEase: "linear",
        arrows: false,
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
        <div className="mx-6">
            <H2 className="mb-6 pt-10">Our Partners</H2>
            <div className="h-18 slider-container justify-center">
                <Carousel opts={{ loop: true }} plugins={[Autoplay({ delay: 4000 })]}>
                    {
                        partners?.map((partner) => (
                            <CarouselItem key={partner.name} className={"basis-full sm:basis-1/2" + (partners?.length > 2 ? " md:basis-1/3" : "") + (partners?.length > 3 ? " lg:basis-1/4" : "") + (partners?.length > 5 ? " xl:basis-1/5" : "")}>
                                <Link 
                                    href={partner.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex flex-col items-center w-full"
                                >
                                    <div className="flex flex-wrap">
                                        <img 
                                            src={partner.logo} 
                                            alt={`${partner.name} logo`} 
                                            className="max-h-18 w-full object-contain" 
                                        />
                                    </div>
                                </Link>
                            </CarouselItem>
                        ))
                    }
                </Carousel>
            </div>
        </div>
    )
}