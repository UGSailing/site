import { H2 } from "@/components";
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
            <div className="grid md:grid-cols-[50%_50%]">
                <img src="https://tinyurl.com/ugentsailing" alt="Join Us" className="h-auto object-cover"/>
                <div className="grid h-full place-items-center">
                    <div className="text-center">
                        <p>Join us?</p>
                        <Link href="/contact"><Button>Contact</Button></Link>
                    </div>
                </div>
            </div>
            <div className="font-sans items-center justify-items-center min-h-screen px-6 mt-5">
                <main className="flex flex-col gap-[32px] row-start-1 items-center sm:items-start">
                    <section>
                        <H2>Roles</H2>

                        Coming soon
                    </section>
                    <section>
                        <H2>Testimonies</H2>
                        
                        Coming soon
                    </section>
                </main>
            </div>
        </>
    );
};

export default Join;
