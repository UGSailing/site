import { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "Contact",
    description: "Contact UGent Sailing",
}
const Contact = () => {
    return <div>Contact
        <Button>Click me</Button>
    </div>;
};

export default Contact;