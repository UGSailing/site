"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const activePageClasses = "block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500";
const defaultPageClasses = "block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700";

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
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="w-full flex flex-wrap items-center justify-between p-3">
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="/img/logos/cropped_logo.png" className="h-8" alt="UGS Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">UGent Sailing</span>
                </Link>
                <div className="content-start hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        {
                            links.map((link) => (
                                <li key={link.href}>
                                    <Link 
                                        href={link.href} 
                                        className={currentPath === link.href ? activePageClasses : defaultPageClasses}
                                        aria-current={currentPath === link.href ? "page" : undefined}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="items-center md:order-3 space-x-2" id="navbar-socials">
                    <ul className="flex font-medium border border-gray-100 rounded-lg bg-gray-50 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
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