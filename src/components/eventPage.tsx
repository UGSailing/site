"use client";

import React from "react";

import { A, H2, H3 } from "@/components";
import Image from "next/image";
import { MarkdownPreview } from '@/components/markdown';

type EventWithImage = {
    image: {
        height: number | null;
        width: number | null;
        id: string;
        size: number;
        createdAt: Date;
        updatedAt: Date;
        filename: string;
        filepath: string;
        mimetype: string;
        uploadedById: string | null;
    } | null;
} & {
    title: string;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    description: string | null;
    startDate: Date;
    endDate: Date;
    location: string;
    intro: string;
    registration: number | null;
    imageId: string | null;
}

export const EventPage = ({event}: {event: EventWithImage}) => {
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                <div className="flex flex-col items-center">
                    <H2>{event.title}</H2>
                    <table>
                        <tbody>
                            <tr key={1}>
                                <td className="w-1/2">
                                    <strong>When:</strong>
                                </td>
                                <td>
                                    <p className="text-sm text-gray-600 mb-1"><span className="bg-gray-600 icon-[material-symbols--calendar-today]"></span>{event.startDate.toLocaleDateString()} {event.endDate ? `- ${event.endDate.toLocaleDateString()}` : ""}</p>
                                </td>
                            </tr>
                            <tr key={2}>
                                <td className="w-1/2">
                                    <strong>Where:</strong>
                                </td>
                                <td>
                                    <p className="text-sm text-gray-600 mb-1"><span className="bg-gray-600 icon-[material-symbols--location-on]"></span>{event.location}</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="w-full grid grid-flow-col py-1 justify-items-center">
                    <div className="w-full ">
                        <Image 
                            src={event.image?.filepath.slice(7) || "/img/logos/cropped_logo.png"} 
                            alt={event.title + " image"} 
                            className="max-h-96 object-cover"
                            width="0"
                            height="0"
                            style={{ width: "100%", height: "auto" }}
                        />
                    </div>
                </div>
            </div>
            <div>
                <H3>Description</H3>
                <div className="prose prose-sm max-w-none">
                    <MarkdownPreview value={event.intro || "No description available"} />
                </div>
            </div>
        </>
    )
              
};