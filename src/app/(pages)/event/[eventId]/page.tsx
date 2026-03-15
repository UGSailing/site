import { Metadata } from "next";
import { H2, H4 } from "@/components";
import { getPrisma } from "@/lib/auth";
import { EventPage as EventPageComponent } from "@/components/eventPage";

export const metadata: Metadata = {
    title: "Event",
    description: "Event - UGent Sailing",
}

export default async function EventPage({ params }: { params: Promise<{ eventId: string }> }) {
    const prisma = await getPrisma();
    const { eventId } = await params;
    const event = await prisma.event.findUnique({
        where: { id: Number(eventId) },
        include: {
            image: true,
        }
    });
    return (
        <>
            <div className="mt-5 font-sans items-center justify-items-center min-h-screen px-6">

                <main className="flex flex-col gap-[32px] row-start-1 items-center sm:items-start">
                    {event ? (
                        <section className="w-full">
                            <EventPageComponent event={event} />
                        </section>
                    ) : (
                        <H2>
                            Event not found
                        </H2>
                    )}
                </main>
            </div>
        </>
    );
};
