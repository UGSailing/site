import { Metadata } from "next";
import { H2, H4 } from "@/components";
import Banner from "@/components/banner";

export const metadata: Metadata = {
    title: "Siemens NX Workshops - UGent Sailing",
    description: "Four Siemens NX workshops (Nov–Dec) hosted by professional trainers. Install NX beforehand and register on ugentsailing.be.",
}

const partnerevent = {
    id: "3",
    title: "Siemens NX Workshops",
    intro: "Four hands-on Siemens NX sessions led by professional trainers. Each session builds on the last — from sketching and modeling to assemblies and advanced topics.",
    description: "Join our Siemens NX workshops to level up your CAD skills. Sessions cover basics, assemblies, topology optimization and composites. Bring your laptop with NX installed.",
    image: "/images/events/cropped_logo.png",
    installUrl: "https://portal.academicsoftware.com/software/siemens-nx~8fbd3299-cb85-4702-8e09-c9860dcef794",
    sessions: [
        { date: "04/11/2025", time: "09:00 - 12:00" },
        { date: "18/11/2025", time: "09:00 - 12:00" },
        { date: "25/11/2025", time: "09:00 - 12:00" },
        { date: "02/12/2025", time: "09:00 - 12:00" },
    ],
    location: "Building 125 second floor, Tech Lane Ghent Science Park, Campus Ardoyen, 9000 Gent",
}

const Partnerevent = () => {
    const bannerData = {
        color: "#d40000",
        message: "Siemens NX workshops - No registration required",
        textColor: "#ffffff",
    }

    return (
        <>
            <Banner {...bannerData} />
            <div className="mt-5 font-sans items-center justify-items-center min-h-screen px-6">
                <main className="flex flex-col gap-[32px] row-start-1 items-center sm:items-start">
                    <section className="max-w-3xl">
                        <H2>{partnerevent.title}</H2>

                        <p className="mb-4">{partnerevent.description}</p>

                        <H4>Schedule</H4>
                        <ul className="list-disc pl-5 mb-4">
                            {partnerevent.sessions.map((s) => (
                                <li key={s.date} className="text-sm text-gray-700">
                                    <strong>{s.date}</strong> — {s.time}
                                </li>
                            ))}
                        </ul>

                        <H4>Where</H4>
                        <p className="text-sm text-gray-600 mb-4">
                            <span className="icon-[material-symbols--location-on] mr-1"></span>
                            {partnerevent.location}
                        </p>

                        <H4>What you'll learn</H4>
                        <ul className="list-disc pl-5 mb-4 text-sm">
                            <li>Sketching and parametric modeling</li>
                            <li>Assemblies and constraints</li>
                            <li>Topology optimization and composites</li>
                            <li>Practical exercises each session</li>
                        </ul>

                        <H4>Preparation / Voorbereiding</H4>
                        <p className="text-sm mb-2">
                            Please install Siemens NX locally before the sessions. Inloggen met je UGent‑email is required.
                        </p>
                        <p className="text-sm mb-4">
                            Installation instructions:{" "}
                            <a href={partnerevent.installUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                                Academic Software portal
                            </a>
                        </p>


                        <H4>Notes</H4>
                        <p className="text-sm text-gray-600">
                            Sessions run 09:00 — 12:00 on the listed Tuesdays. Bring your laptop with NX installed for hands-on practice.
                        </p>
                    </section>
                </main>
            </div>
        </>
    );
};

export default Partnerevent;
