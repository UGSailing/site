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

UGent Sailing brings together students and young researchers with an interest in maritime technology, artificial intelligence, and innovation. Our goal is to create an environment where everyone can gain hands-on experience and grow, both technically and personally. To achieve this, we work with Design Sprints: open sessions held about once a week, where anyone can join to focus collectively on a specific part of the boat.

Our broader mission is to contribute to a sustainable future for the maritime sector. We aim to show that sustainable and autonomous solutions to real-life problems go hand in hand; not as concepts of the future, but as technologies we can build today.

To put our ideas into practice, we are competing in the Monaco Energy Boat Challenge. This competition gives us a shared goal to work towards and a tangible way to measure our progress. Alongside this main project, we also take on smaller side quests: developing a living lab to monitor the condition of the campus pond, and exploring the use of biofuels for future prototypes.

This year, we are competing in the AI class, but our ambition reaches further. In the coming years, we aim to join the Sealab class, the research-focused master class of the competition. To get there, we are building strong connections with the university through VOP collaborations and master’s theses, ensuring our project grows to a research-worthy level.

While UGent Sailing is primarily a student team, our community is open to everyone — from bachelor’s and master’s students to PhD candidates and young graduates. Together, we are working towards innovation on the water and a smarter, cleaner maritime future.

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
