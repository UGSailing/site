import EventCarousel from "@/components/eventCarousel";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Timeline",
    description: "Timeline of UGent Sailing",
}

const Timeline = () => {
    
    return (
        <div className="font-sans items-center justify-items-center min-h-screen px-6">
            <main className="w-full flex flex-col gap-[32px] row-start-1 items-center sm:items-start">
                <h1 className="scroll-m-20 w-full text-center text-4xl font-extrabold tracking-tight text-balance">
                    Events
                </h1>
                <EventCarousel key="timeline-carousel"></EventCarousel>
                <h1 className="scroll-m-20 w-full text-center text-4xl font-extrabold tracking-tight text-balance">
                    Our Ship
                </h1>
            </main>
        </div>
    )
};

export default Timeline;