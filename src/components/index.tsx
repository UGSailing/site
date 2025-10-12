import { cn } from "@/lib/utils";
import Link from "next/link";

const h1Classes: string = [
    "border-b",             // Add a bottom border
    "border-red-700",       // Border color
    "w-full",               // Full width
    "pb-2",                 // Padding bottom
    "text-4xl",             // Font size
    "font-bold",            // Bold font
    "tracking-tight",       // Tight letter spacing
    "first:mt-0",           // No top margin for the first element
    "text-red-700"          // Text color
].join(" ")

function H1({ className, ...opts }: React.ComponentProps<"h1"> ) {
    return <h1 className={cn(h1Classes, className)} {...opts}/>;
}

const h2Classes: string = [
    "border-b",             // Add a bottom border
    "border-red-700",       // Border color
    "w-full",               // Full width
    "mb-4",                 // Margin bottom
    "text-3xl",             // Font size
    "font-semibold",        // Semi-bold font
    "tracking-tight",       // Tight letter spacing
    "first:mt-0",           // No top margin for the first element
    "text-red-700"          // Text color
].join(" ")

function H2({ className, ...opts }: React.ComponentProps<"h2"> ) {
    return <h2 className={cn(h2Classes, className)} {...opts}/>;
}

const h3Classes: string = [
    "mb-3",                 // Margin bottom
    "text-2xl",             // Font size
    "font-semibold",        // Semi-bold font
    "tracking-tight",       // Tight letter spacing
    "first:mt-0",           // No top margin for the first element
    "text-red-700"          // Text color
].join(" ")

function H3({ className, ...opts }: React.ComponentProps<"h3"> ) {
    return <h3 className={cn(h3Classes, className)} {...opts}/>;
}

const h4Classes: string = [
    "mt-3",                 // Margin top
    "mb-1",                 // Margin bottom
    "text-lg",              // Font size
    "font-semibold",        // Semi-bold font
    "text-black"            // Text color
].join(" ")

function H4({ className, ...opts }: React.ComponentProps<"h4"> ) {
    return <h4 className={cn(h4Classes, className)} {...opts}/>;
}

const aClasses: string = [
    "text-red-600",         // Text color
    "underline",            // Underline
    "hover:text-red-800"    // Hover color
].join(" ")

function A({ className, href, ...opts }: React.ComponentProps<"a">) {
    href = href ?? "#";
    const isInternal = href.startsWith("/") || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:");
    if (!isInternal) {
        opts.target = "_blank";
        opts.rel = "noopener noreferrer";
        return (
            <Link 
                className={cn(aClasses, className)} 
                {...opts} 
                href={href}
            >
                {opts.children}
                <span className="icon-[bi--box-arrow-up-right] mx-1"></span>
            </Link>
        )
    }
    return <Link 
        className={cn(aClasses, className)} 
        {...opts} 
        href={href}
    />;
}

const quoteClasses: string = [
    "mt-6",                 // Margin top
    "border-l-2",           // Left border
    "border-red-600",       // Border color
    "pl-6",                 // Padding left
    "italic"                // Italic text
].join(" ")

function Quote({ className, ...opts }: React.ComponentProps<"blockquote"> ) {
    return <blockquote className={cn(quoteClasses, className)} {...opts}/>;
}


export {
    H1,
    H2,
    H3,
    H4,
    A,
    Quote
};