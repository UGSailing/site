"use client";

import * as React from "react";
import { ChevronDown, ChevronRight, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "./ui/navigation-menu";

interface MenuLink {
    title: string;
    href: string;
}

interface MenuSubmenu {
    title: string;
    submenu: MenuItem[];
}

type MenuItem = MenuLink | MenuSubmenu;

const menuItems: MenuItem[] = [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { title: "Team", href: "/crew" },
    { title: "Timeline", href: "/timeline" },
    { title: "Events", href: "/events" },
    { title: "Partners", href: "/partners" },
    { title: "Join us", href: "/join" },
    { title: "Living Lab", href: "/living-lab" },
];

const MenuItemComponent: React.FC<{ item: MenuItem; depth?: number }> = (
    { item, depth = 0 },
) => {
    const [isOpen, setIsOpen] = React.useState(false);

    if (item instanceof Object && "submenu" in item) {
        return (
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                <CollapsibleTrigger asChild>
                    <button
                        className={cn(
                            "flex w-full items-center justify-between py-2 text-lg text-white font-medium bg-red transition-colors hover:text-white",
                            depth > 0 && "pl-4",
                        )}
                    >
                        {item.title}
                        {isOpen
                            ? <ChevronDown className="h-4 w-4" />
                            : <ChevronRight className="h-4 w-4" />}
                    </button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    {item.submenu.map((subItem) => (
                        <MenuItemComponent
                            key={subItem.title}
                            item={subItem}
                            depth={depth + 1}
                        />
                    ))}
                </CollapsibleContent>
            </Collapsible>
        );
    }

    return (
        <Link
            href={item.href!}
            className={cn(
                "block py-2 px-4 hover:bg-red-600 rounded-md select:bg-red-600 text-lg font-medium transition-colors text-white",
                depth > 0 && "pl-4",
            )}
        >
            {item.title}
        </Link>
    );
};

export function HamburgerMenu() {
    const [open, setOpen] = React.useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden hover:bg-red-700 hover:text-white text-white"
                >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only text-white">Toggle menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent
                side="right"
                className="bg-red w-[240px] text-white font-semibold pt-1 sm:w-[300px]"
            >
                <SheetTitle className="space-y-4 block py-2 px-4 text-lg font-bold text-white">
                    Menu
                </SheetTitle>
                <nav className="flex flex-col space-y-4">
                    {menuItems.map((item) => (
                        <MenuItemComponent key={item.title} item={item} />
                    ))}
                </nav>
            </SheetContent>
        </Sheet>
    );
}

export function NavMenu() {
    return (
        <NavigationMenu className="hidden lg:block bg-red">
            <NavigationMenuList>
                {
                    menuItems.map((menu) => (
                        <NavigationMenuItem className="red" key={menu.title}>
                            <NavigationMenuLink
                                asChild
                                className={`group inline-flex h-9 text-lg text-white w-max items-center justify-center rounded-md px-4 py-2 font-semibold hover:text-white focus:text-white focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1`}
                            >
                                <MenuItemComponent item={menu} />
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    ))
                }
            </NavigationMenuList>
        </NavigationMenu>
    );
}

