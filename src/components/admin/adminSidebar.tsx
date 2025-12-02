"use client";

import { usePathname } from "next/navigation";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Calendar, Home } from "lucide-react";

interface AdminPagesListItem {
    title: string;
    href: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    regex?: RegExp;
}

interface AdminPagesListGroup {
    label: string;
    items: AdminPagesListItem[];
}

export default function AdminSidebar() {
    const pathname = usePathname();
    const groups: AdminPagesListGroup[] = [
        {
            label: "Application",
            items: [
                {
                    title: "Home",
                    href: "/admin",
                    icon: Home,
                    regex: /^\/admin\/?$/
                },
                {
                    title: "Events",
                    href: "/admin/event",
                    icon: Calendar,
                    regex: /^\/admin\/event\/?$/
                },
            ]
        }
    ]
    return (
        <Sidebar collapsible="none" variant="sidebar" className="h-full m-4">
            <SidebarContent>
                <SidebarGroup>
                    {
                        groups.map((group, index) => (
                            <div key={index}>
                                <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
                                <SidebarGroupContent>
                                    <SidebarMenu>
                                        {group.items.map((item) => (
                                            <SidebarMenuItem key={item.title}>
                                                <SidebarMenuButton
                                                    asChild
                                                    className={`${item.regex?.test(pathname) ? "bg-red text-white" : ""} hover:text-white`}
                                                >
                                                    <a href={item.href}>
                                                        <item.icon />

                                                        <span>{item.title}</span>
                                                    </a>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        ))}
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </div>
                        ))
                    }
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}