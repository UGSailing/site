"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "./ui/navigation-menu";

interface LinkItem {
    name: string;
    href: string;
}

const links: LinkItem[] = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Board", href: "/board" },
    { name: "Timeline", href: "/timeline" },
    { name: "Partners", href: "/partners" },
    { name: "Join us", href: "/join" },
    { name: "Living Lab", href: "/living-lab" },
]

interface SocialItem {
    icon: string;
    href: string;
    name: string;
}

const socials: SocialItem[] = [
    { name: "Facebook", href: "https://www.facebook.com/people/UGent-Sailing/61573219499660/", icon: "icon-[bi--facebook]" },
    { name: "Instagram", href: "https://www.instagram.com/ugentsailing/", icon: "icon-[bi--instagram]" },
    { name: "Discord", href: "https://discord.gg/BmRtd6qb4z", icon: "icon-[bi--discord]" },
    { name: "LinkedIn", href: "https://www.linkedin.com/company/ugent-sailing/posts/?feedView=all", icon: "icon-[bi--linkedin]" },
    { name: "Github", href: "https://github.com/UGSailing", icon: "icon-[bi--github]" },
    { name: "Nextcloud", href: "https://sailing.ugent.be", icon: "icon-[simple-icons--nextcloud]"}
]

export function NavBar() {
    const currentPath = usePathname();

    return (
        <nav className="bg-red-500 border-red-200 dark:bg-red-500">
            <div className="w-full flex flex-wrap items-center justify-between p-3">
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="/img/logos/cropped_logo.png" className="h-8" alt="UGS Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">UGent Sailing</span>
                </Link>
                <NavigationMenu>
                    <NavigationMenuList>
                        {
                            links.map((link) => (
                                <NavigationMenuItem className="bg-red-500" key={link.name}>
                                    <NavigationMenuLink asChild className={`group inline-flex h-9 text-lg text-white w-max items-center justify-center rounded-md ${currentPath == link.href ? "bg-red-700" : "bg-red-500"} px-4 py-2 font-semibold hover:${currentPath == link.href ? "bg-red-700" : "bg-red-600"} hover:text-white focus:${currentPath == link.href ? "bg-red-700" : "bg-red-600"} focus:text-white focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1`}>
                                        <Link href={link.href}>{link.name}</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            ))
                        }
                    </NavigationMenuList>
                </NavigationMenu>
                <div className="items-center md:order-3 space-x-2" id="navbar-socials">
                    <ul className="flex font-medium rounded-lg bg-red-500 text-white">
                        {
                            socials.map((social) => (
                                <li className="mx-3" key={social.href}>
                                    <Link className="nav-link" href={social.href} target="_blank" rel="noopener noreferer">
                                        <i className={social.icon}></i>
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </nav>


    );
}