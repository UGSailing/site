import { Metadata } from "next";
import { H2, H4 } from "@/components";
import Banner from "@/components/banner";

export const metadata: Metadata = {
    title: "Partnerevent",
    description: "Pertnerevent - UGent Sailing",
}

const partnerevent = {
    id: "3",
    title: "Partnerevent",
    startDate: " 29-09-2025, 16:00",
    location: " Locus, Tech Lane Ghent Science Park, Campus Ardooie, 9000 Gent",
    intro: "Our prototype boat, which we worked a whole semester on, will be launched.",
    description: "Our prototype boat, which we worked a whole semester on, will be launched. Together with all our partners, we will celebrate this milestone.",
    image: "/images/events/cropped_logo.png",
    registration: false,
}

const Partnerevent = () => {
    const bannerData = {
        color: "#ffdb0b",
        message: "More info coming soon.",
        textColor: "#111111"
    }

    return (
        <>
            <Banner {...bannerData} />
            <div className="mt-5 font-sans items-center justify-items-center min-h-screen px-6">

                <main className="flex flex-col gap-[32px] row-start-1 items-center sm:items-start">
                    <section>
                        <H2>{partnerevent.title}</H2>

                        <p>{partnerevent.description}</p>

                        <H4>In short</H4>
                        <strong>When:</strong><p className="text-sm text-gray-600 mb-1"><span className="bg-gray-600 icon-[material-symbols--calendar-today]"></span>{partnerevent.startDate}</p>
                        <strong>Where:</strong><p className="text-sm text-gray-600 h-8"><span className="bg-gray-600 icon-[material-symbols--location-on]"></span>{partnerevent.location}</p>




                    </section>
                </main>
            </div>
        </>
    );
};

export default Partnerevent;
