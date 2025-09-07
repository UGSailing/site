import { Metadata } from "next";
import { A, H2, H4, Quote } from "@/components";

export const metadata: Metadata = {
    title: "About",
    description: "About - UGent Sailing",
}

const About = () => {
    return (
        <div className="font-sans items-center justify-items-center min-h-screen px-6">

            <main className="flex flex-col gap-[32px] row-start-1 items-center sm:items-start">
                <section>
                    <H2>Info</H2>

                    <H4>Who We Are</H4>
                    UGent Sailing is a team of bachelor’s, master’s, and PhD students, as well as young graduates. 
                    Everyone under 27 at the start of a work year is welcome to join, regardless of background.
                    At least half of our members are UGent students.

                    <H4>What We Do</H4>
                    We are building an autonomous, CO₂-neutral vessel to compete in the <A href="https://energyboatchallenge.com/">Monaco Energy Boat Challenge</A> , 
                    a prestigious international competition. Our first participation will be in July 2026 in the AI class, 
                    but we will also participated in the Sealab class from July 2027 on.

                    <H4>Our Goals</H4>
                    As a student association, we pursue three main goals: (check dit even voor betere voorwaarden in onze statuten pls, die vind je online in UBOregister ofz)
                    <ol className="list-decimal list-inside">
                        <li>
                            Bringing together people with a passion for maritime engineering, technology, and automation.
                        </li>
                        <li>
                            Offering young people a hands-on learning environment.
                        </li>
                        <li>
                            Contributing to a more sustainable future.
                        </li>
                    </ol>

                    <H4>How We Work</H4>

                    We meet every Monday to keep the entire team up to date. Our team is built on a horizontal structure where every voice matters equally, 
                    and each member takes responsibility for a part of the project they choose at the start. 
                    In addition, we organize design sprints every one to two weeks, open to all members who want to contribute and learn together. 
                    Our locals are at the Technology Park, in Zwijnaarde. 

                </section>
                <section>
                    <H2>History</H2>

                    Coming soon
                </section>
                <section>
                    <H2>From the team</H2>

                    Coming soon
                    <br />
                    <Quote>
                        &quot;A fancy quote from Jorien&quot;
                        <br />
                        ~ Jorien, Captain Extern
                    </Quote>

                </section>
            </main>
        </div>
    );
};

export default About;