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
import { type Session } from "next-auth";
import { ROLES } from "@/lib/auth-types";
import { Calendar, Home, Newspaper, Users, LayoutGrid, Award, Briefcase, Star } from "lucide-react";
import { H4 } from "..";

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
                roles: ROLES.TEAM,
            },
            {
                title: "Events",
                href: "/admin/event",
                icon: Calendar,
                regex: /^\/admin\/event\/?.*$/,
                roles: ROLES.TEAM,
            },
            {
                title: "Partners",
                href: "/admin/partner",
                icon: Users,
                regex: /^\/admin\/partner\/?.*$/,
                roles: ROLES.TEAM,
            },
            {
                title: "News",
                href: "/admin/news",
                icon: Newspaper,
                regex: /^\/admin\/news\/?.*$/,
                roles: ROLES.TEAM,
            },
        ],
    },
    {
        label: "Board",
        items: [
            {
                title: "Boards",
                href: "/admin/board",
                icon: LayoutGrid,
                regex: /^\/admin\/board\/?(?:create\/?)?(?:\d+\/?)?$/,
                roles: ROLES.TEAM,
            },
            {
                title: "Members",
                href: "/admin/board/memberyear",
                icon: Award,
                regex: /^\/admin\/board\/memberyear\/?(?:create\/?)?(?:\d+\/?)?$/,
                roles: ROLES.TEAM,
            },
            {
                title: "Member Positions",
                href: "/admin/board/memberposition",
                icon: Briefcase,
                regex: /^\/admin\/board\/memberposition\/?(?:create\/?)?(?:\d+\/?)?$/,
                roles: ROLES.TEAM,
            },
            {
                title: "Positions",
                href: "/admin/position",
                icon: Star,
                regex: /^\/admin\/position\/?(?:create\/?)?(?:\d+\/?)?$/,
                roles: ROLES.TEAM,
            },
            {
                title: "People",
                href: "/admin/board/member",
                icon: Users,
                regex: /^\/admin\/board\/member\/?(?:create\/?)?(?:\d+\/?)?$/,
                roles: ROLES.TEAM,
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
                                <SidebarGroupLabel>
                                    <H4 className="text-red-500">
                                        {group.label}
                                    </H4>
                                </SidebarGroupLabel>
                                <SidebarGroupContent>
                                    <SidebarMenu>
                                        {group.items.map((item) => (
                                            <SidebarMenuItem key={item.title}>
                                                <SidebarMenuButton
                                                    asChild
                                                    className={`${item.regex?.test(pathname) ? "bg-ugs text-white" : ""} hover:text-white`}
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