import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
        <html lang={locale}>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <Providers locale={locale} messages={messages}>
                    <NavBar />
                    {/* <Banner {...bannerData} /> */}
                    {children}
                    <Partners />
                    <FlyingImage />
                    <Footer />
                </Providers>
            </body>
        </html>
    );
}
