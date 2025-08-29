import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About",
    description: "About - UGent Sailing",
}

const About = () => {
    return (
        <div className="font-sans items-center justify-items-center min-h-screen px-6">
            
            <main className="flex flex-col gap-[32px] row-start-1 items-center sm:items-start">
                <section>
                    <h2 className="text-3xl font-bold mb-4">
                        Info
                    </h2>
                    Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
                </section>
                <section>
                    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-red-700">
                        History
                    </h2>
                    Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
                </section>
                <section>
                    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-red-700">
                        Woordje van het team
                    </h2>
                    Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
                    <br/>
                    <blockquote className="mt-6 border-l-2 border-red-500 pl-6 italic">
                        "Jorien die hier wat yapping zet"
                        <br/>
                        ~ Jorien, Captain Extern
                    </blockquote>
                
                </section>
            </main>
        </div>
    );
};

export default About;