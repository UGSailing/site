'use client'

import React, { useEffect, useState } from 'react';
import type { SimpleBoard } from "@/data/board";
import Carousel, { CarouselItem } from "./carousel";
import { H4 } from ".";
import { client, ApiTypes } from "@/prisma/apiclient";

type Board = ApiTypes["BoardListResponse"]["data"][0]

async function getMember(id: string) {
    return client.GET(`/api/model/rest/boardMember/{id}`, {
        params: {
            path : {
                id
            }
        }
    }).then(res => {
        if (!res.response.ok) throw new Error(`HTTP ${res.response.status}`);
        const attributes = res.data!.data.attributes;
        return {
            name: attributes.name,
            image: attributes.imageId || null,
            index: attributes.index
        };
    });
}

export function BoardHomePage() {
    const [board, setBoard] = useState<SimpleBoard | null | "None">(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        client.GET('/api/model/rest/board')
            .then(async (res) => {
                if (!res.response.ok) {
                    setBoard("None");
                    throw new Error(`HTTP ${res.response.status}\n${res.error!.errors}`);
                }
                const current_board = res.data!.data.sort((a: Board, b: Board) => b.attributes.year - a.attributes.year)[0];
                const data = {
                    year: current_board.attributes.year,
                    name: current_board.attributes.name,
                    HTMLid: current_board.attributes.htmlid,
                    members: await Promise.all(current_board.relationships!.members!.data.map(async (m: { type: string, id: string} ) => (await getMember(m.id))))
                };
                setBoard(data);
            })
            .catch((err) => setError(err.message));
    }, []);

    if (error) return <div>Error: {error}</div>;
    if (board === null) return <div>Loading…</div>;
    if (board === "None") return <div>No Board</div>;
    console.log(board);
    return (
        <Carousel>
            {
                board!.members.map((member, index) => (
                    <CarouselItem key={index} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 h-full">
                        <div className="p-4 h-full">
                            <div className="border border-red-500 rounded-lg p-4 text-center items-center w-full h-full flex flex-col justify-between">
                                <div>
                                    <img
                                        src={member.image || "/img/logos/cropped_logo.png"}
                                        alt={member.name}
                                        className="w-full aspect-square object-cover rounded-full mb-4"
                                    />
                                    <H4 className="mb-2 text-gray-700 h-15">{member.name}</H4>
                                </div>
                            </div>
                        </div>
                    </CarouselItem>
                ))
            }
        </Carousel>
    )
}
