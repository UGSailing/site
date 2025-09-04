"use client";
import Link from "next/link";
import { HamburgerMenu, NavMenu } from "./navMenu";


export function NavBar() {
    return (
        <nav className="bg-red border-red-200 dark:bg-red-500">
            <div className="w-full flex flex-wrap items-center justify-between p-3">
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="/img/logos/cropped_logo.png" className="h-8" alt="UGS Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">UGent Sailing</span>
                </Link>
                <NavMenu />
                <HamburgerMenu />
            </div>
        </nav>


    );
}