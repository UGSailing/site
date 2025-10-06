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

export function EventCard({ event }: { event: EventType }) {
    const eventPassed = Date.parse(event.startDate) < Date.now() + 1.5 * 3600 * 1000;
    const disabled = { disabled: eventPassed || !event.registration };
    return (
        <div className="w-full grid grid-flow-col py-1 justify-items-center">
            <Card className={`w-full max-w-sm ${eventPassed ? "border-grey-700 opacity-70" : "border-red-500"}`}>
                <CardHeader>
                    <CardTitle className={`${eventPassed ? "text-black" : "text-red-700"} text-lg`}>
                        { event.title }
                    </CardTitle>
                    <CardDescription>
                        <p className="text-sm text-gray-600 mb-1"><span className="bg-gray-600 icon-[material-symbols--calendar-today]"></span>{event.startDate} {event.endDate ? `- ${event.endDate}` : ""}</p>
                        <p className="text-sm text-gray-600 h-8"><span className="bg-gray-600 icon-[material-symbols--location-on]"></span>{event.location}</p>
                    </CardDescription>
                    <CardAction>
                        <Button {...disabled} variant="secondary" size="sm" className={`mt-2 ${disabled.disabled ? "" : "cursor-pointer"} ${eventPassed ? "bg-black" : "bg-red-500"} text-white hover:bg-red-600`}>
                            Register
                        </Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <img src={event.image} alt={event.title + " image"} className={`mb-4 rounded-md ${eventPassed ? "grayscale" : ""}`} />
                </CardContent>
            </Card>
        </div>
    );
};