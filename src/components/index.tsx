import { cn } from "@/lib/utils";
import Link from "next/link";

function H1({ className, ...opts }: React.ComponentProps<"h1"> ) {
    return <h1 className={cn("border-b w-full pb-2 text-4xl font-bold tracking-tight first:mt-0 text-red-700", className)} {...opts}/>;
}

function H2({ className, ...opts }: React.ComponentProps<"h2"> ) {
    return <h2 className={cn("border-b border-red-700 w-full pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-red-700", className)} {...opts}/>;
}

function H3({ className, ...opts }: React.ComponentProps<"h3"> ) {
    return <h3 className={cn("text-2xl text-red-700 font-semibold tracking-tight", className)} {...opts}/>;
}

function H4({ className, ...opts }: React.ComponentProps<"h4"> ) {
    return <h4 className={cn("text-lg text-black font-semibold tracking-tight", className)} {...opts}/>;
}

function A({ className, href, ...opts }: React.ComponentProps<"a">) {
    href = href ?? "#";
    const isInternal = href.startsWith("/") || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:");
    if (!isInternal) {
        opts.target = "_blank";
        opts.rel = "noopener noreferrer";
        return (
            <Link 
                className={cn("text-red-600 underline hover:text-red-800", className)} 
                {...opts} 
                href={href}
            >
                {opts.children}
                <span className="icon-[bi--box-arrow-up-right] mx-1"></span>
            </Link>
        )
    }
    return <Link 
        className={cn("text-red-600 underline hover:text-red-800", className)} 
        {...opts} 
        href={href}
    />;
}

function Quote({ className, ...opts }: React.ComponentProps<"blockquote"> ) {
    return <blockquote className={cn("mt-6 border-l-2 border-red-600 pl-6 italic", className)} {...opts}/>;
}


export {
    H1,
    H2,
    H3,
    H4,
    A,
    Quote
};