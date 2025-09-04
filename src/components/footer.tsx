import Link from "next/link";
import { H4 } from ".";
import socials from "./socials";

export function Footer() {
    return (
        <div className="bg-red px-5 md:px-10 lg:px-15 2xl:px-20 mt-5 py-5 text-white">
            <div className="w-full grid grid-cols-1 md:grid-cols-2">
                <div className="text-sm m-4">
                    {/* Temp div */}
                    <div>
                        <H4 className="text-white mb-2">UGent Sailing</H4>
                        <p>Follow us on instagram to receive the latest information</p>
                    </div>
                    {/* Final div */}
                    <div className="hidden">
                        <p className="mb-2">
                            <strong>Contact us</strong>
                        </p>
                        <p>Stay up to date with our newletter, or link to our agenda.</p>
                        { /* Some buttons for newsletter and agenda */ }
                        <p className="mb-2">
                            <strong>Join us</strong>
                        </p>
                        <p>Come join us on { /* Next activity date or sum */ }</p>
                    </div>
                </div>
                <div>
                    <div className="text-sm m-4">
                        <H4 className="text-white mb-2">Contact us</H4>
                        <p className="mb-2">Via mail: <a href="mailto:contact@ugentsailing.be"><u>contact@ugentsailing.be</u></a></p>
                        <ul className="flex font-medium">
                            {
                                socials.map((social, i) => (
                                    <li key={i} className="mx-3">
                                        <Link 
                                            className="nav-link" 
                                            href={social.href} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                        >
                                            <i className={social.icon}></i>
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}