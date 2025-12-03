import { auth } from "@/lib/auth"
import { PropsWithChildren } from "react"
import { SessionProvider } from "next-auth/react";
import { redirect, RedirectType } from "next/navigation";
import prisma from "@/prisma"
import { SidebarProvider } from "@/components/ui/sidebar";

import AdminSidebar from "@/components/admin/adminSidebar";

export default async function AdminLayout({ children }: PropsWithChildren) {
    const session = await auth()
    if (session?.user) {
        session.user = {
            ...session.user,
            roles: await prisma.role.findMany({
                where: {
                    users: {
                        some: {
                            userId: session.user.id
                        }
                    }
                }
            })
        }
    } else {
        return redirect("/login", RedirectType.replace);
    }

    return (
        <SessionProvider session={session}>
            <SidebarProvider>
                <AdminSidebar className="w-full md:w-[300px]" user={session.user} />
                <main className="flex-1 m-4 overflow-auto md:w-full md:block hidden">
                    {children}
                </main>
            </SidebarProvider>
            <div className="md:hidden block">
                {children}
            </div>
        </SessionProvider>
    )
}
