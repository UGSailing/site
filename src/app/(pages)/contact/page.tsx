import { Metadata } from "next";
import { A, H2, H3, H4 } from "@/components";
import socials from "@/components/socials";
import logo from "@/../public/images/logos/logo_red_white.svg";
import Image from "next/image";
import Section from "@/components/layout/sections";

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

const telephoneNumbers: { label: string; number: string }[] = [
    {
        label: "Jorien Baert (Captain Engineering)",
        number: "+32 474 72 65 99"
    },
    {
        label: "August Adams (Captain Extern)",
        number: "+32 483 38 68 33"
    },
    {
        label: "Robin Aerts (Captain Intern)",
        number: "+32 456 17 23 62"
    }
];

const Contact = () => {
    return (
        <div className="font-sans items-center justify-items-center min-h-screen px-6">
            <main className="w-full flex flex-col gap-[32px] row-start-1 items-center sm:items-start pt-6">
                <Section>
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
                                <Image 
                                    src={logo} 
                                    alt="Contact us" 
                                    className="max-h-96 object-cover" 
                                />
                            </div>
                        </div>
                    </div>
                </Section>
                <Section>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-6">
                        <div className="flex flex-col px-6">
                            <H3>
                                Telephone Numbers
                            </H3>
                            <p className="mb-4">You can always reach us by phone. Below are the contact numbers for our captains:</p>
                            <table>
                                <tbody>
                                    {
                                        telephoneNumbers.map((item, index) => (
                                            <tr key={index}>
                                                <td className="w-1/2">
                                                    <H4>{item.label}:</H4>
                                                </td>
                                                <td className="text-left">
                                                    <A href={`tel:${item.number}`}>
                                                        {item.number}
                                                    </A>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="flex flex-col px-6">
                            <H3>
                                Email
                            </H3>
                            <p className="mb-4">Feel free to reach out to us via mail with any questions or inquiries. We&apos;re here to help! Below are the email addresses for specific topics: </p>
                            <table className="w-full">
                                <tbody>
                                    {
                                        emails.map((item, index) => (
                                            <tr key={index}>
                                                <td className="w-1/2">
                                                    <H4>{item.label}:</H4>
                                                </td>
                                                <td className="text-left">
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
                    </div>
                </Section>
                <Section>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-6">
                        <div className="flex flex-col px-6">
                            <H3>
                                Socials
                            </H3>
                            <p className="mb-4">Connect with us on social media! Follow us for updates, news, and community engagement. Below are our social media links:</p>
                            <table>
                                <tbody>
                                    {
                                        socials.map((social, index) => (
                                            <tr key={index}>
                                                <td className="w-1/2">
                                                    <H4><span className={`${social.icon} mr-2`} />{social.platform}:</H4>
                                                </td>
                                                <td className="text-left">
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
                        <div className="flex flex-col px-6">
                            <H3>
                                Company Info
                            </H3>
                            <p className="mb-4">UGent Sailing VZW is a student organization affiliated with Ghent University. UGent Sailing vzw is registered as a non-profit organisation in the Kingdom of Belgium.</p>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <H4>Company Name:</H4>
                                        </td>
                                        <td>
                                            <p>UGent Sailing VZW</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <H4>Address:</H4>
                                        </td>
                                        <td>
                                            <p>Technologiepark-Zwijnaarde 126, 9052 Zwijnaarde, Belgium</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <H4>Enterprise Number:</H4>
                                        </td>
                                        <td>
                                            <p>BE 1020.324.885</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <H4>Articles of Association:</H4>
                                        </td>
                                        <td>
                                            <A href="/statuten.pdf" target="_blank" rel="noopener noreferrer">View PDF (Dutch)</A>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <H4>Internal regulations:</H4>
                                        </td>
                                        <td>
                                            <A href="/intern_reglement.pdf" target="_blank" rel="noopener noreferrer">View PDF (Dutch)</A>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Section>
            </main>
        </div>
    )
};

export default Contact;
