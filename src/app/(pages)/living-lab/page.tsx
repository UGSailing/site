import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Living Lab",
    description: "Living Lab - UGent Sailing",
}

const LivingLab = () => {
    return (
        <div className="mt-5 font-sans items-center justify-items-center min-h-screen px-6">
            
            <main className="flex flex-col gap-[32px] row-start-1 items-center sm:items-start">
                UGent Sailing Living Lab - More information coming soon
                
                <br/>
                UGent Sailing placed a boat in the pond at Tech Lang Ghent Science Park, Campus A. We are planning on putting sensors on this boat. Live data will be available through an API and on this page. Coming soon.
            </main>
        </div>
    );
};

export default LivingLab;