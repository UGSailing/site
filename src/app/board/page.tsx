'use client';
import React from 'react';
import { useEffect, useState } from 'react';

import baord from '@/data/board';

const Board = () => {
    const now = new Date();
    now.setMonth(now.getMonth() - 7);

    const [currentYear, setCurrentYear] = useState(now.getFullYear());

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        if (searchParams.has('year')) {
            const year = parseInt(searchParams.get("year") as any as string);
            if (!isNaN(year)) {
                setCurrentYear(year);
            }
        }
    }, []);

    const members = baord.find(board => board.year === currentYear);
    
    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Board</h1>
            <p className="mb-8">Meet the team that leads our organization.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    members ? members.members.map((member, index) => (
                        <div key={index} className="bg-white rounded-lg shadow p-6 dark:bg-gray-800">
                            <img src={member.image} alt={member.name} className="w-full h-48 object-cover rounded-t-lg mb-4" />
                            <h2 className="text-xl font-semibold mb-2">{member.name}</h2>
                            <ul className="list-disc pl-5">
                                {
                                    member.positions.map((position, posIndex) => (
                                        <li key={posIndex}>{position.name}</li>
                                    ))
                                }
                            </ul>
                        </div>
                    )) : (
                        <p>No members found for the year {currentYear}.</p>
                    )
                }
            </div>
        </div>
    )
};

export default Board;