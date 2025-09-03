import { Metadata } from "next";
import { H2, Quote } from "@/components";

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

                    Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
                </section>
                <section>
                    <H2>History</H2>

                    Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
                </section>
                <section>
                    <H2>Woordje van het team</H2>

                    Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
                    <br />
                    <Quote>
                        "Jorien die hier wat yapping zet"
                        <br />
                        ~ Jorien, Captain Extern
                    </Quote>

                </section>
            </main>
        </div>
    );
};

export default About;