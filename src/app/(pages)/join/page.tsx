import { H1, H2, H3, H4 } from "@/components";
import { Quote } from "@/components";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Join",
    description: "Join UGent Sailing",
}
const Join = () => {
    return (
        <>
            {/* Hero Section */}
            <div className="relative w-full h-96">
                <img src="https://tinyurl.com/ugentsailing" alt="Join Us" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center justify-center md:justify-end">
                    <div className="text-center md:text-right md:pr-16 text-white max-w-md">
                        <h1 className="text-5xl md:text-6xl font-bold mb-4">Join Our Crew</h1>
                        <p className="text-xl md:text-2xl mb-8 font-light">Be part of something extraordinary</p>
                        <Link href="/contact"><Button className="bg-white text-black hover:bg-gray-200 px-8 py-3 text-lg">Get In Touch</Button></Link>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="w-full bg-gradient-to-b from-slate-50 to-white">
                <main className="max-w-6xl mx-auto px-6 py-20">
                    {/* Roles Section */}
                    <section className="mb-20">
                        <H2>Available Roles</H2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                <H3 className="text-xl font-semibold mb-3">Meme Captain</H3>
                                <p className="text-gray-600">Every organisation needs someone to keep the spirits high and fill the sails with joy. See you in the memeverse!</p>
                            </div>
                        </div>
                    </section>

                    {/* Testimonies Section */}
                    <section className="mb-20">
                        <H2>Member Stories</H2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <Quote inline={false}>
                                <H3 className="text-gray-700 italic mb-4">Merkel</H3>
                                <p className="text-gray-500 font-semibold">Sie haben es geschafft! Ich liebe UGent Segeln!</p>
                            </Quote>
                            <Quote inline={false}>
                                <H3 className="text-gray-700 italic mb-4">Darius</H3>
                                <p className="text-gray-500 font-semibold">Ik ben met hun boot tot in Finland geraakt! Zeker aan te bevelen</p>
                            </Quote>
                        </div>
                    </section>

                    {/* CTA Section */}
                    <section className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg p-12 text-white text-center">
                        <h2 className="text-3xl font-bold mb-4">Ready to set sail?</h2>
                        <p className="text-lg mb-8 opacity-90">Join UGent Sailing today and become part of our passionate community</p>
                        <Link href="/contact"><Button className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">Contact Us</Button></Link>
                    </section>
                </main>
            </div>
        </>
    );
};

export default Join;
