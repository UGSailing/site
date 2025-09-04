"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "./ui/navigation-menu";
import { HamburgerMenu, NavMenu } from "./navMenu";

interface SocialItem {
    icon: string;
    href: string;
    name: string;
}

const socials: SocialItem[] = [
    { name: "Instagram", href: "https://www.instagram.com/ugentsailing/", icon: "icon-[bi--instagram]" },
    { name: "Discord", href: "https://discord.gg/BmRtd6qb4z", icon: "icon-[bi--discord]" },
    { name: "LinkedIn", href: "https://www.linkedin.com/company/ugent-sailing/posts/?feedView=all", icon: "icon-[bi--linkedin]" },
    { name: "Facebook", href: "https://www.facebook.com/people/UGent-Sailing/61573219499660/", icon: "icon-[bi--facebook]" },
    { name: "Github", href: "https://github.com/UGSailing", icon: "icon-[bi--github]" },
    { name: "Nextcloud", href: "https://sailing.ugent.be", icon: "icon-[simple-icons--nextcloud]"}
]

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