'use client';
import React from 'react';

import board from '@/data/board';
import Board from '@/components/board';

const BoardPage = () => {
    board.sort((a, b) => b.year - a.year);
    
    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Board</h1>
            <p className="mb-8">Meet the team that leads our organization.</p>
            <div>
                { board.map((boardItem, boardIndex) => (
                    <Board key={boardIndex} board={boardItem} />
                )) }
            </div>
        </div>
    )
};

export default BoardPage;