import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/navbar";
import { Sponsors } from "@/components/sponsors";
import Banner from "@/components/banner";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: {
        default: "UGent Sailing",
        template: "%s | UGent Sailing",
    }
}


export default function RootLayout({
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
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <NavBar />
                <Banner {...bannerData} />
                {children}
                <Sponsors />
            </body>
        </html>
    );
}
