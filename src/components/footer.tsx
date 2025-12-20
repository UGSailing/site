import Link from "next/link";
import { H4 } from ".";
import socials from "./socials";
// import { LocaleSwitcher } from "./locale-switcher";

export function Footer() {
    return (
        <div className="bg-red px-5 md:px-10 lg:px-15 2xl:px-20 mt-5 py-5 text-white">
            <div className="flex flex-col md:flex-row m-4 text-sm">
                <div className="flex-1 flex flex-col gap-2 items-center md:items-start">
                    <H4 className="text-white">UGent Sailing</H4>
                    <p>Follow us on instagram to receive the latest information</p>
                    {/* <LocaleSwitcher /> */}
                </div>
                    
                <div className="flex-1 flex flex-col items-center gap-2">
                    <H4 className="text-white">Contact Us</H4>
                    <p><a href="mailto:contact@ugentsailing.be"><u>contact@ugentsailing.be</u></a></p>
                </div>
                <div className="flex-1 flex flex-col items-center md:items-end gap-2 mt-6">
                    <div className="flex gap-2">
                        {socials.map(s => (
                            <Link key={s.platform} href={s.href} target="_blank" rel="noopener noreferrer" className="nav-link" >
                                <p className={s.icon + " w-6 h-6"} />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
