import { Alert, AlertTitle } from "@/components/ui/alert";
import { PartnerCard } from "@/components/partnerCard";
import { Metadata } from "next";
import Link from "next/link";
import prisma from "@/prisma";
import { H2 } from "@/components";

// Fisher-Yates shuffle with seed
function seededShuffle<T>(array: T[], seed: number): T[] {
    const arr = [...array];
    const random = (index: number) => {
        const x = Math.sin(seed + index) * 10000;
        return x - Math.floor(x);
    };
    
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(random(i) * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

export const metadata: Metadata = {
    title: "Partners",
    description: "Partners - UGent Sailing",
}
const Partners = async () => {
    // Generate seed based on current date (changes daily, consistent across reloads)
    const today = new Date();
    const dateString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const seed = parseInt(dateString.replace(/-/g, ''), 10);
    
    const partners = await prisma.partner.findMany({
        include: {
            logo: true,
            vacancies: true,
        },
        where: {
            active: true,
        }
    });

    // Shuffle partners by category using the seed
    const headPartners = seededShuffle(partners.filter(p => p.isHead), seed);
    const regularPartners = seededShuffle(partners.filter(p => !p.isHead), seed + 1);
    
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
                               Do you want to be a new wind in our sails? <span className="icon-[bi--arrow-right] h-4"></span> Join us as a partner and help us steer the ship towards Monaco!
                            </AlertTitle>
                        </Alert>
                    </Link>

                    <H2>Our Head Partners</H2>

                    {/* Partners List */}
                    <div className="flex flex-col gap-8">
                        {
                            headPartners.map((partner) => (
                                <div key={partner.name} className="transform hover:scale-[1.02] transition-transform duration-300">
                                    <PartnerCard partner={partner}></PartnerCard>
                                </div>
                            ))
                        }
                    </div>

                    <H2 className="mt-12">Our Partners</H2>

                    <div className="flex flex-col gap-8">
                        {
                            regularPartners.map((partner) => (
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