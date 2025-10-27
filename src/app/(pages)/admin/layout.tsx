import { auth } from "@/lib/auth"
import { PropsWithChildren } from "react"
import { SessionProvider } from "next-auth/react";
import { redirect, RedirectType } from "next/navigation";

export default async function AdminLayout({ children }: PropsWithChildren) {
    const session = await auth()
    if (session?.user) {
        session.user = {
            name: session.user.name,
            email: session.user.email,
            image: session.user.image,
        }
    } else {
        return redirect("/login", RedirectType.replace);
    }

    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    )
}
