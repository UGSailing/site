'use client'

import React, { useEffect, useState } from 'react';
import type { Board } from "@/data/board";
import Carousel, { CarouselItem } from "./carousel";
import { H4 } from ".";

async function getMember(id) {
	return fetch(`/api/model/rest/boardMember/${id}`)
	.then(async (res) => {
	  const json = await res.json();
	  const data = json.data;
	  return {
	    index: data.attributes.index,
	    name: data.attributes.name,
	    image: data.attributes.image
	  }
	})
}

export function BoardHomePage() {
    const [boards, setBoards] = useState<Board[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
	fetch('/api/model/rest/board')
      	.then(async (res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
	    const json = await res.json();
	    const data = await Promise.all(json.data.map(async (b) => ({
	      year: b.attributes.year,
	      name: b.attributes.name,
	      HTMLid: b.attributes.htmlid,
	      members: await Promise.all(b.relationships.members.data.map(async (m) => (await getMember(m.id))))
	    })));
            setBoards(data);
      	})
      	.catch((err) => setError(err.message));
    }, []);
    
    if (error) return <div>Error: {error}</div>;
    if (!boards) return <div>Loading…</div>;
    if (boards.length == 0) return <div>No Board</div>;
    console.log(boards[0]);
    return (
        <Carousel>
            {
                boards.sort((a, b) => b.year - a.year)[0]!.members.map((member, index) => (
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
