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
import { Calendar, Home, Newspaper, Users } from "lucide-react";
import { type Session } from "next-auth";
import { ROLES } from "@/lib/auth-types";

interface AdminPagesListItem {
    title: string;
    href: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    regex?: RegExp;
    roles: bigint[]; // Empty array means accessible to all roles that can access the admin panel
}

interface AdminPagesListGroup {
    label: string;
    items: AdminPagesListItem[];
}
const groups: AdminPagesListGroup[] = [
    {
        label: "Application",
        items: [
            {
                title: "Home",
                href: "/admin",
                icon: Home,
                regex: /^\/admin\/?$/,
                roles: ROLES.TEAM_MEMBER.concat(ROLES.SPONSOR),
            },
            {
                title: "Events",
                href: "/admin/event",
                icon: Calendar,
                regex: /^\/admin\/event\/?.*$/,
                roles: ROLES.TEAM_MEMBER,
            },
            {
                title: "Partners",
                href: "/admin/partner",
                icon: Users,
                regex: /^\/admin\/partner\/?.*$/,
                roles: ROLES.MATES,
            },
            {
                title: "News",
                href: "/admin/news",
                icon: Newspaper,
                regex: /^\/admin\/news\/?.*$/,
                roles: ROLES.MATES,
            }
        ]
    }
];

export default function AdminSidebar({ className, user }: { className?: string, user: Session["user"] }) {
    const pathname = usePathname();

    const userRoleIds = user?.roles?.map(role => role.id) || [];

    const filteredGroups = groups.map(group => {
        const filteredItems = group.items.filter(item =>
            item.roles.length === 0 || item.roles.some(roleId => userRoleIds.includes(roleId))
        );
        return { ...group, items: filteredItems };
    }).filter(group => group.items.length > 0);

    return (
        <Sidebar collapsible="none" variant="sidebar" className={`h-full m-4 ${className}`}>
            <SidebarContent>
                <SidebarGroup>
                    {
                        filteredGroups.map((group, index) => (
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