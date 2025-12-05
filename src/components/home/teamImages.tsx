"use client";
import Carousel, { CarouselItem } from "@/components/carousel";
import teamImage from "@/../public/img/board2425.jpg";
export interface TeamImages {
    src: string;
    alt: string;
}
const teamImages: TeamImages[] = [
    { src: teamImage.src, alt: "Board 2024-2025" },
    { src: teamImage.src, alt: "Board 2024-2025" },
];

export default function TeamImagesSection() {
    return (
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
    )
}