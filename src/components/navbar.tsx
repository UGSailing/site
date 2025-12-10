"use client";
import Link from "next/link";
import { HamburgerMenu, NavMenu } from "./navMenu";
import Image from "next/image";
import logo from "@/../public/img/logos/cropped_logo.png";


export function NavBar() {
    return (
        <nav className="bg-red border-red-200 dark:bg-red-500">
            <div className="w-full flex flex-wrap items-center justify-between p-3">
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Image 
                        src={logo} 
                        className="h-8 w-auto" 
                        alt="UGS Logo" 
                    />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">UGent Sailing</span>
                </Link>
                <NavMenu />
                <HamburgerMenu />
            </div>
        </nav>
    );
}