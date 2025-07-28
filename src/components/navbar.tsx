"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const activePageClasses = "block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500";
const defaultPageClasses = "block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700";


export function NavBar() {
    const currentPath = usePathname();

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="w-full flex flex-wrap items-center justify-between p-3">
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="/img/logos/cropped_logo.png" className="h-8" alt="UGS Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">UGent Sailing</span>
                </Link>
                <div className="content-start flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    {/* <button type="button" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                        <span className="sr-only">Open user menu</span>
                        <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="user photo"></img>
                    </button> */}
                    {/* <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
                        <div className="px-4 py-3">
                            <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
                            <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
                        </div>
                        <ul className="py-2" aria-labelledby="user-menu-button">
                            <li>
                                <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</Link>
                            </li>
                            <li>
                                <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</Link>
                            </li>
                            <li>
                                <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Earnings</Link>
                            </li>
                            <li>
                                <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</Link>
                            </li>
                        </ul>
                    </div> */}
                    {/* <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button> */}
                </div>
                <div className="content-start hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <Link 
                                href="/" 
                                className={currentPath === "/" ? activePageClasses : defaultPageClasses}
                                aria-current={currentPath === "/" ? "page" : undefined}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href="/timeline" 
                                className={currentPath === "/timeline" ? activePageClasses : defaultPageClasses}
                                aria-current={currentPath === "/timeline" ? "page" : undefined}
                            >
                                Timeline
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href="/board" 
                                className={currentPath === "/board" ? activePageClasses : defaultPageClasses}
                                aria-current={currentPath === "/board" ? "page" : undefined}
                            >
                                Board
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href="/join" 
                                className={currentPath === "/join" ? activePageClasses : defaultPageClasses}
                                aria-current={currentPath === "/join" ? "page" : undefined}
                            >
                                Join us
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href="/contact" 
                                className={currentPath === "/contact" ? activePageClasses : defaultPageClasses}
                                aria-current={currentPath === "/contact" ? "page" : undefined}
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="items-center md:order-3 space-x-2" id="navbar-socials">
                    <ul className="flex font-medium border border-gray-100 rounded-lg bg-gray-50 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li className="mx-3">
                            <Link className="nav-link" href="https://www.facebook.com/people/UGent-Sailing/61573219499660/" target="_blank" rel="noopener noreferrer">
                                <i className="icon-[bi--facebook]"></i>
                            </Link>
                        </li>
                        <li className="mx-3">
                            <Link className="nav-link" href="https://www.instagram.com/ugentsailing/" target="_blank" rel="noopener noreferrer">
                                <i className="icon-[bi--instagram]"></i>
                            </Link>
                        </li>
                        <li className="mx-3">
                            <Link className="nav-link" href="https://discord.gg/BmRtd6qb4z" target="_blank" rel="noopener noreferrer">
                                <i className="icon-[bi--discord]"></i>
                            </Link>
                        </li>
                        <li className="mx-3">
                            <Link className="nav-link" href="https://www.linkedin.com/company/ugent-sailing/posts/?feedView=all" target="_blank" rel="noopener noreferrer">
                                <i className="icon-[bi--linkedin]"></i>
                            </Link>
                        </li>
                        <li className="mx-3">
                            <Link className="nav-link" href="https://github.com/UGSailing" target="_blank" rel="noopener noreferrer">
                                <i className="icon-[bi--github]"></i>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>


    );
}