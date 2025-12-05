"use client";
import Link from "next/link";
import Carousel, { CarouselItem } from "@/components/carousel";
import Autoplay from 'embla-carousel-autoplay';
import { H2 } from "..";
import { ApiTypes } from "@/prisma/apiclient";

type ExtendedPartner ={
    logo: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        filename: string;
        filepath: string;
        mimetype: string;
        size: number;
        width: number | null;
        height: number | null;
        uploadedById: string | null;
    } | null;
} & {
    name: string;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    active: boolean;
    url: string;
    description: string | null;
    logoId: string | null;
}

export function PartnerCarousel({ partners }: { partners?: ExtendedPartner[] }) {
    return (
        <div className="mx-6">
            <H2 className="mb-6 pt-10">Our Partners</H2>
            <div className="h-18 slider-container justify-center">
                <Carousel opts={{ loop: true }} plugins={[Autoplay({ delay: 4000 })]}>
                    {
                        partners?.map((partner) => (
                            <CarouselItem key={partner.name} className={"basis-full sm:basis-1/2" + (partners?.length > 2 ? " md:basis-1/3" : "") + (partners?.length > 3 ? " lg:basis-1/4" : "") + (partners?.length > 5 ? " xl:basis-1/5" : "")}>
                                <Link 
                                    href={partner.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex flex-col items-center w-full"
                                >
                                    <div className="flex flex-wrap">
                                        <img 
                                            src={ partner.logo?.filepath } 
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