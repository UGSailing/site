import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "./ui/button";

type Event = {
    image: {
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
    endDate: Date;
    startDate: Date;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    location: string;
    intro: string;
    description: string | null;
    registration: number | null;
    imageId: string | null;
}

export function EventCard({ event }: { event: Event }) {
    const eventPassed = event.startDate.getTime() < Date.now() + 1.5 * 3600 * 1000;
    const disabled = { disabled: eventPassed || !event.registration };
    return (
        <div className="w-full grid grid-flow-col py-1 justify-items-center">
            <Card className={`w-full max-w-sm ${eventPassed ? "border-grey-700 opacity-70" : "border-red-500"}`}>
                <CardHeader>
                    <CardTitle className={`${eventPassed ? "text-black" : "text-red-700"} text-lg`}>
                        { event.title }
                    </CardTitle>
                    <CardDescription>
                        <p className="text-sm text-gray-600 mb-1"><span className="bg-gray-600 icon-[material-symbols--calendar-today]"></span>{event.startDate.toLocaleDateString()} {event.endDate ? `- ${event.endDate.toLocaleDateString()}` : ""}</p>
                        <p className="text-sm text-gray-600 h-8"><span className="bg-gray-600 icon-[material-symbols--location-on]"></span>{event.location}</p>
                    </CardDescription>
                    <CardAction>
                        <Button {...disabled} variant="secondary" size="sm" className={`mt-2 ${disabled.disabled ? "" : "cursor-pointer"} ${eventPassed ? "bg-black" : "bg-red-500"} text-white hover:bg-red-600`}>
                            Register
                        </Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <img src={event.image?.filepath || "/img/logos/cropped_logo.png"} alt={event.title + " image"} className={`mb-4 rounded-md ${eventPassed ? "grayscale" : ""}`} />
                </CardContent>
            </Card>
        </div>
    );
};

export function FutureEventCard() {
    return (
        <div className="w-full grid grid-flow-col py-1 justify-items-center">
            <Card className={`w-full max-w-sm border-red-500`}>
                <CardHeader>
                    <CardTitle className={`text-red-700 text-lg`}>
                        Future events coming soon!
                    </CardTitle>
                    <CardDescription>
                        <p className="text-sm text-gray-600 mb-1"><span className="bg-gray-600 icon-[material-symbols--calendar-today]"></span>To be announced</p>
                        <p className="text-sm text-gray-600 h-8"><span className="bg-gray-600 icon-[material-symbols--location-on]"></span>To be announced</p>
                    </CardDescription>
                    <CardAction>
                        <Button disabled variant="secondary" size="sm" className={`mt-2 text-white bg-red-500`}>
                            Register
                        </Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <img src={"/img/logos/cropped_logo.png"} alt={"Future events image"} className={`mb-4 rounded-md`} />
                </CardContent>
            </Card>
        </div>
    );
}