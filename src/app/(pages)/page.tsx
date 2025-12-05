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
                        <H2>{"Some intro"}</H2>

                        {"Some intro text about the sailing club."}

                    </section>
                    <section className="w-full max-w-full">
                        <H2>{"Events"}</H2>

                        <EventsSection />
                    </section>
                    <section className="w-full max-w-full">
                        <H2>{"News"}</H2>

                        <NewsSection />
                        
                    </section>
                    <section className="w-full max-w-full">
                        <H2>{"Board"}</H2>

                        <BoardHomePage />
                    </section>
                </main>
            </div>
        </div>
    );
}
