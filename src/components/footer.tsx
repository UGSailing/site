import Link from "next/link";

export function Footer() {
    return (
        <div className="bg-red-800 px-5 md:px-10 lg:px-15 2xl:px-20 mt-5 py-5 text-white">
            <div className="w-full grid grid-cols-1 md:grid-cols-2">
                <div className="text-sm m-4">
                    {/* Temp div */}
                    <div>
                        <p className="mb-2">
                            <strong>UGent Sailing</strong>
                        </p>
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
                    <div className="m-4">
                        <ul className="flex font-medium">
                            <li className="mx-3">
                                <Link 
                                    className="nav-link" 
                                    href="https://www.facebook.com/people/UGent-Sailing/61573219499660/" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                >
                                    <i className="icon-[bi--facebook]"></i>
                                </Link>
                            </li>
                            <li className="mx-3">
                                <Link 
                                    className="nav-link" 
                                    href="https://www.instagram.com/ugentsailing/" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                >
                                    <i className="icon-[bi--instagram]"></i>
                                </Link>
                            </li>
                            <li className="mx-3">
                                <Link 
                                    className="nav-link" 
                                    href="https://discord.gg/BmRtd6qb4z" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                >
                                    <i className="icon-[bi--discord]"></i>
                                </Link>
                            </li>
                            <li className="mx-3">
                                <Link 
                                    className="nav-link" 
                                    href="https://www.linkedin.com/company/ugent-sailing/posts/?feedView=all" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                >
                                    <i className="icon-[bi--linkedin]"></i>
                                </Link>
                            </li>
                            <li className="mx-3">
                                <Link 
                                    className="nav-link" 
                                    href="https://github.com/UGSailing" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                >
                                    <i className="icon-[bi--github]"></i>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <u>
                            <Link
                                href="/contact"
                            >
                                Contact
                            </Link>
                        </u>
                    </div>
                </div>
            </div>
        </div>
    )
}