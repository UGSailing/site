import { Alert, AlertTitle } from "@/components/ui/alert";
import { partners } from "@/data/partners";
import { PartnerCard } from "@/components/partnerCard";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Partners",
    description: "Partners - UGent Sailing",
}
const Partners = () => {
    return (
        <>
            {/* Hero Section */}
            <div className="relative w-full bg-gradient-to-r from-red-600 to-red-700 py-8 text-white">
                <div className="max-w-6xl mx-auto px-6">
                    <h1 className="text-4xl md:text-5xl font-bold mb-2">Our Partners</h1>
                    <p className="text-lg md:text-xl font-light opacity-90">Join forces with UGent Sailing</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="w-full bg-gradient-to-b from-slate-50 to-white">
                <main className="max-w-6xl mx-auto px-6 py-10">
                    {/* CTA Alert */}
                    <Link href="/contact" className="w-full mb-10 block">
                        <Alert className="w-full border-2 border-red-500 bg-red-50 hover:bg-red-100 transition-colors">
                            <AlertTitle className="text-lg font-semibold text-red-700 flex items-center gap-2">
                                Want to become a partner? <span className="icon-[bi--arrow-right] h-4"></span> Contact us!
                            </AlertTitle>
                        </Alert>
                    </Link>

                    {/* Partners List */}
                    <div className="flex flex-col gap-8">
                        {
                            partners.map((partner) => (
                                <div key={partner.name} className="transform hover:scale-[1.02] transition-transform duration-300">
                                    <PartnerCard partner={partner}></PartnerCard>
                                </div>
                            ))
                        }
                    </div>
                </main>
            </div>
        </>
    );
};

export default Partners;