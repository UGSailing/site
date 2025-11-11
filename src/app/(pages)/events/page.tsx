import { Metadata } from "next";
import { events } from "@/data/events";
import { EventCard } from "@/components/eventCard";
import { H1 } from "@/components";
export const metadata: Metadata = {
    title: "Events",
    description: "Future and past events of UGent Sailing",
}

const Events = () => {

    function isFutureEvent(event: { startDate: string }) {
        const [d, m, y] = event.startDate.split("-").map(Number);
        const eventDate = new Date(y, m - 1, d);
        return eventDate > new Date();
    }

    function isPastEvent(event: { startDate: string }) {
        const [d, m, y] = event.startDate.split("-").map(Number);
        const eventDate = new Date(y, m - 1, d);
        return eventDate <= new Date();
    }
    
    return (
        <div className="">
            <main className="items-center justify-items-center px-6 mt-5 font-sans pb-8">
                <H1 className="text-center w-full">Coming Soon</H1>
                <div className="flex flex-wrap gap-6 justify-center">
                {events.filter(isFutureEvent).map((event) => (
                    <EventCard key={event.id} event={event} />
                ))}
                </div>
            </main>
            <main className="items-center justify-items-center px-6 mt-5 font-sans pb-8">
                <H1 className="text-center w-full">Past Events</H1>
                <div className="flex flex-wrap gap-6 justify-center">
                {events.filter(isPastEvent).map((event) => (
                    <EventCard key={event.id} event={event} />
                ))}
                </div>
            </main>
        </div>

    )
};

export default Events;