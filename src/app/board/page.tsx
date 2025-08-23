import React from 'react';
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Board",
    description: "UGent Sailing Board",
}
import board from '@/data/board';
import Board from '@/components/board';

const BoardPage = () => {
    board.sort((a, b) => b.year - a.year);
    
    return (
        <div>
            <div>
                <h1 className="text-3xl font-bold mb-4">Board</h1>
                <p className="mb-8">Some yapping about what the board does maybe.</p>
            </div>
            <div style={{position: "relative"}} className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-6">
                { /* Main content */ }
                <div className="order-2 md:order-none">
                    <div>
                        { board.map((boardItem, boardIndex) => (
                            <Board key={boardIndex} board={boardItem} />
                        )) }
                    </div>
                </div>
                
                {/* Mobile sidebar */}
                <aside className="md:hidden order-1 md:order-none bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow md:hidden">
                    <h3 className="text-xl font-bold mb-4">Boards</h3>
                    <div className="flex flex-col space-y-2">
                        {
                            board.map((boardItem, index) => (
                                <a 
                                    key={index} 
                                    href={`#${boardItem.HTMLid}`} 
                                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none"
                                >
                                    {boardItem.name}
                                </a>
                            ))
                        }
                    </div>
                </aside>
                { /* Desktop sidebar */ }
                <div className="hidden md:block sticky top-0 right-0 px-2 h-[100px] w-full bg-black pt-5">
                    <h3 className="text-xl font-bold mb-4">Boards</h3>
                    <div className="flex flex-col space-y-2">
                        {
                            board.map((boardItem, index) => (
                                <a 
                                    key={index} 
                                    href={`#${boardItem.HTMLid}`} 
                                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none"
                                >
                                    {boardItem.name}
                                </a>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};

export default BoardPage;