import { Button } from "@/components/ui/button";
import {Metadata} from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Join",
    description: "Join UGent Sailing",
}
const Join = () => {
    return (
        <>
            <div className="grid md:grid-cols-[50%_50%]">
                <img src="/img/board2425.jpg" alt="Join Us" className="h-auto object-cover"/>
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
                        <h2 className="text-3xl font-bold mb-4">
                            Rollen
                        </h2>
                        To be implemented
                    </section>
                    <section>
                        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-red-700">
                            Testimonies
                        </h2>
                        To be implemented
                    </section>
                </main>
            </div>
        </>
    );
};

export default Join;