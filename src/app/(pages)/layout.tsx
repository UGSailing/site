import type { Metadata } from "next";
import "./globals.css";
import { NavBar } from "@/components/navbar";
import { Partners } from "@/components/partners";
import Banner from "@/components/banner";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
    title: {
        default: "UGent Sailing",
        template: "%s | UGent Sailing",
    }
}

export default function PagesLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const bannerData = {
        color: "#ffdb0b",
        message: "This website is under construction.",
        textColor: "#111111"
    }
    return (
        <>
            <NavBar />
            {/* <Banner {...bannerData} /> */}
            {children}
            <Partners />
            <Footer />
        </>
    );
}
