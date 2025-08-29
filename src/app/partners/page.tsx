import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {Metadata} from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Partners",
    description: "Partners - UGent Sailing",
}
const Partners = () => {
    return (
        <>
            <div className="font-sans items-center justify-items-center min-h-screen px-6 mt-5">
                <main className="flex flex-col gap-[32px] row-start-1 items-center sm:items-start">
                    <Link href="/contact" className="w-full text-center">
                        <Alert className="w-full border-red-500">
                            <AlertTitle>
                                Want to become a partner? <span className="icon-[bi--arrow-right] h-3"></span> Contact us!
                            </AlertTitle>
                        </Alert>
                    </Link>
                    
                    To be implemented
                </main>
            </div>
        </>
    );
};

export default Partners;