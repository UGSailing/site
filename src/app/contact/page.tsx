import { Metadata } from "next";
import { A, H2, H3, H4 } from "@/components";
import Link from "next/link";
import socials from "@/components/socials";

export const metadata: Metadata = {
    title: "Contact",
    description: "Contact UGent Sailing",
}

const emails: { label: string; email: string }[] = [
    {
        label: "General inquiries",
        email: "contact@ugentsailing.be"
    },
    {
        label: "Financial matters",
        email: "penning@ugentsailing.be"
    },
    {
        label: "Partners",
        email: "partner@ugentsailing.be"
    }
];

const Contact = () => {
    return (
        <div className="font-sans items-center justify-items-center min-h-screen px-6">
            <main className="w-full flex flex-col gap-[32px] row-start-1 items-center sm:items-start pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                    <div className="flex flex-col h-100 items-center">
                        <div className="grid h-full place-items-center">
                            <div>
                                <H2>
                                    Contact us
                                </H2>
                                <p className="mb-4">Feel free to reach out to us via email or social media!</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col h-100 items-center">
                        <div className="grid h-full place-items-center">
                            <img src="/img/logos/cropped_logo.png" alt="Contact us" className="max-h-96 object-cover" />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                    <div className="flex flex-col h-100 px-6">
                        <H3>
                            Email
                        </H3>
                        <p className="mb-4">Feel free to reach out to us via mail with any questions or inquiries. We're here to help! Below are the email addresses for specific topics: </p>
                        <table>
                            <tbody>
                                {
                                    emails.map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                <H4>{item.label}:</H4>
                                            </td>
                                            <td>
                                                <A href={`mailto:${item.email}`}>
                                                    {item.email}
                                                </A>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="flex flex-col h-100">
                        <H3>
                            Socials
                        </H3>
                        <p className="mb-4">Connect with us on social media! Follow us for updates, news, and community engagement. Below are our social media links:</p>
                        <table>
                            <tbody>
                                {
                                    socials.map((social, index) => (
                                        <tr key={index}>
                                            <td>
                                                <H4><span className={`${social.icon} mr-2`} />{social.platform}:</H4>
                                            </td>
                                            <td>
                                                <A href={social.href} target="_blank" rel="noopener noreferrer">
                                                    {social.name}
                                                </A>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    )
};

export default Contact;