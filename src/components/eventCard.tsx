import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { type EventType } from "@/data/events";
import { Button } from "./ui/button";

export function EventCard({ key, event }: { key: any, event: EventType }) {
    const eventPassed = Date.parse(event.date) < Date.now() + 1.5 * 3600 * 1000;
    return (
        <div className="w-full grid grid-flow-col py-1 justify-items-center">
            <Card className={`w-full max-w-sm ${eventPassed ? "border-grey-700 opacity-70" : "border-red-500"}`}>
                <CardHeader>
                    <CardTitle className={`${eventPassed ? "text-black" : "text-red-700"} text-lg`}>
                        { event.title }
                    </CardTitle>
                    <CardDescription>
                        { event.date } - { event.location }
                    </CardDescription>
                    <CardAction>
                        <Button disabled={!event.registration} variant="secondary" size="sm" className="mt-2">
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