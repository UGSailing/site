import board from "@/data/board";
import Carousel, { CarouselItem } from "./carousel";
import { H4 } from ".";


export function BoardHomePage() {
    console.log(board);
    return (
        <Carousel>
            {
                board.sort((a, b) => b.year - a.year)[0]!.members.map((member, index) => (
                    <CarouselItem key={index} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 h-full">
                        <div className="p-4 h-full">
                            <div className="border border-red-500 rounded-lg p-4 text-center items-center w-full h-full flex flex-col justify-between">
                                <div>
                                    <img 
                                        src={member.image || "/img/logos/cropped_logo.png"} 
                                        alt={member.name} 
                                        className="w-full aspect-square object-cover rounded-full mb-4"
                                    />
                                    <H4 className="mb-2 text-gray-700 h-15">{member.name}</H4>
                                </div>
                            </div>
                        </div>
                    </CarouselItem>
                ))
            }
        </Carousel>
    )
}