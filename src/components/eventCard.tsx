import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { type EventType } from "@/data/events";
import { Button } from "./ui/button";

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import Link from "next/link";

function parseDate(dateStr: string): Date {
    const parts = dateStr.split(",")[0].trim().split("-");
    if (parts.length !== 3) return new Date(); // Invalid date
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Months are zero-based in JS Date
    const year = parseInt(parts[2], 10);

    const parts2 = dateStr.split(",")[1]?.trim().split(":");
    if (parts2 && parts2.length === 2) {
        const hours = parseInt(parts2[0], 10);
        const minutes = parseInt(parts2[1], 10);
        return new Date(year, month, day, hours + 1, minutes);
    }
    return new Date(year, month, day);
}

export function EventCard({ event }: { event: EventType }) {
    const eventPassed = +parseDate(event.startDate) < Date.now() - 1.5 * 3600 * 1000;
    return (
        <div className="w-full grid grid-flow-col py-1 justify-items-center">
            <Card className={`w-full max-w-sm ${eventPassed ? "border-grey-700 opacity-70" : "border-red-500"}`}>
                <CardHeader className="h-36">
                    <CardTitle className={`${eventPassed ? "text-black" : "text-red-700"} text-lg`}>
                        {event.title}
                    </CardTitle>
                    <CardDescription>
                        <HoverCard>
                            <HoverCardTrigger>
                                <p className="text-sm text-gray-600 mb-1 h-10 overflow-hidden"><span className="bg-gray-600 icon-[material-symbols--calendar-today]"></span>{event.startDate} {event.endDate ? `- ${event.endDate}` : ""}</p>
                            </HoverCardTrigger>
                            <HoverCardContent>
                                <p className="text-sm text-gray-600 mb-1"><span className="bg-gray-600 icon-[material-symbols--calendar-today]"></span>{event.startDate} {event.endDate ? `- ${event.endDate}` : ""}</p>
                            </HoverCardContent>
                        </HoverCard>
                        <HoverCard>
                            <HoverCardTrigger>
                                <p className="text-sm text-gray-600 h-10 overflow-hidden"><span className="bg-gray-600 icon-[material-symbols--location-on]"></span>{event.location}</p>
                            </HoverCardTrigger>
                            <HoverCardContent>
                                <p className="text-sm text-gray-600"><span className="bg-gray-600 icon-[material-symbols--location-on]"></span>{event.location}</p>
                            </HoverCardContent>
                        </HoverCard>
                    </CardDescription>
                    <CardAction>
                        {
                            event.link ? (
                                <Link href={event.link}>
                                    <Button variant="secondary" size="sm" className={`mt-2 cursor-pointer ${eventPassed ? "bg-black" : "bg-red-500"} text-white hover:bg-red-600`}>
                                        {!event.registration ? "More info" : "Register"}
                                    </Button>
                                </Link>
                            ) : (
                                <Button disabled variant="secondary" size="sm" className={`mt-2 "" ${eventPassed ? "bg-black" : "bg-red-500"} text-white hover:bg-red-600`}>
                                    More Info
                                </Button>
                            )
                        }
                    </CardAction>
                </CardHeader>
                <CardContent>
                    {
                        event.intro ? (
                            <div className="relative group">
                                <img
                                    src={event.image}
                                    alt={event.title + " image"}
                                    className={`mb-4 rounded-md transition-opacity group-hover:opacity-30 ${eventPassed ? "grayscale" : ""}`}
                                />
                                <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                    <p className="text-center px-4">{event.intro}</p>
                                </div>
                            </div>
                        ) : (
                            <img src={event.image} alt={event.title + " image"} className={`mb-4 rounded-md ${eventPassed ? "grayscale" : ""}`} />
                        )
                    }
                </CardContent>
            </Card>
        </div>
    );
};