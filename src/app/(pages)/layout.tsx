import type { Metadata } from "next";
import "./globals.css";
import { NavBar } from "@/components/navbar";
import { Partners } from "@/components/partners";
import Banner from "@/components/banner";
import { Footer } from "@/components/footer";
import FlyingImage from "@/components/flyingImage";
import { cookies } from "next/headers";
import Providers from "../Providers";
import { getMessages, resolveLocale } from "@/i18n/config";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { Geist, Geist_Mono } from "next/font/google";

export const metadata: Metadata = {
    title: {
        default: "UGent Sailing",
        template: "%s | UGent Sailing",
    }
}


export default async function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const bannerData = {
        color: "#ffdb0b",
        message: "This website is under construction.",
        textColor: "#111111",
    };

    const cookieStore = await cookies();
    const localeCookie = cookieStore.get("locale")?.value ?? null;
    const locale = resolveLocale(localeCookie);
    const messages = await getMessages(locale);

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
