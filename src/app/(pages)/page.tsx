import { H2 } from "@/components";
import { BoardHomePage } from "@/components/boardHomePage";
import { EventsSection } from "@/components/home/events";
import { NewsSection } from "@/components/home/news";
import TeamImagesSection from "@/components/home/teamImages";

export default function Home() {
    return (
        <div>
            <TeamImagesSection />
            <div className="font-sans items-center min-h-screen px-6">

                <main className="flex flex-col gap-[32px] row-start-1 items-center sm:items-start">
                    <section>
                        <H2>Intro</H2>

                        We are UGent Sailing, a diverse team of students and young graduates building an autonomous, CO₂-neutral vessel to compete in the Monaco Energy Boat Challenge.

                    </section>
                    <section className="w-full max-w-full">
                        <H2>Events</H2>

                        <EventsSection />
                    </section>
                    <section className="w-full max-w-full">
                        <H2>News</H2>

                        <NewsSection />
                        
                    </section>
                    <section className="w-full max-w-full">
                        <H2>Board</H2>

                        {/* <BoardHomePage /> */}
                        Coming soon
                    </section>
                </main>
            </div>
        </div>
    );
}
