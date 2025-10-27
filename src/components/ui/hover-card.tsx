import React from "react";

interface HoverCardProps {
    children: React.ReactNode;
    content: React.ReactNode;
    className?: string;
    popupClassName?: string;
}

const HoverCard = (
    { children, content, className = "", popupClassName = "" }: HoverCardProps,
) => {
    return (
        <div className={`group relative ${className}`}>
            {children}
            <div
                className={`
                absolute inset-0 p-4
                bg-white  rounded-xl
                opacity-0
                group-hover:opacity-100
                z-2
                flex flex-col justify-center items-center 
                ${popupClassName}
            `}
            >
                {content}
            </div>
        </div>
    );
};

export default HoverCard;
