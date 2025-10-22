import React from 'react';
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Board",
    description: "UGent Sailing Board",
}
import board from '@/data/board';
import Board from '@/components/board';
import { H2, H3, H4 } from '@/components';
import Link from 'next/link';

const BoardPage = () => {
    board.sort((a, b) => b.year - a.year);
    
    return (
        <div className="px-6 pt-5">
            <div>
                <H2 className="mb-4">Crew</H2>
                <p className="mb-8">
                    Our crew is the driving force behind UGent Sailing. They create the designs, organize the design sprints, 
                    and come up with the craziest ideas and smartest solutions. Want to meet them?
                </p>
            </div>
            <div style={{ position: "relative" }} className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-6">
                { /* Main content */ }
                <div className="order-2 md:order-none">
                    <div>
                        { board.map((boardItem, boardIndex) => (
                            <Board key={boardIndex} board={boardItem} />
                        )) }
                    </div>
                </div>
                
                {/* Mobile sidebar */}
                <aside className="md:hidden order-1 md:order-none border border-red-700 dark:bg-gray-800 p-4 rounded-lg shadow md:hidden">
                    <H4 className="mb-4">Boards</H4>
                    <div className="flex flex-col space-y-2">
                        {
                            board.map((boardItem, index) => (
                                <Link 
                                    key={index} 
                                    href={`#${boardItem.HTMLid}`} 
                                    className="px-4 py-2 bg-red text-white rounded-lg hover:bg-red-600 focus:outline-none"
                                >
                                    {boardItem.name}
                                </Link>
                            ))
                        }
                    </div>
                </aside>
                { /* Desktop sidebar */ }
                <div className="hidden md:block sticky top-0 right-0 px-2 h-[100px] w-full pt-5">
                    <H3 className="mb-4">Boards</H3>
                    <div className="flex flex-col space-y-2">
                        {
                            board.map((boardItem, index) => (
                                <Link 
                                    key={index} 
                                    href={`#${boardItem.HTMLid}`} 
                                    className="px-4 py-2 bg-red text-white rounded-lg hover:bg-red-600 focus:outline-none"
                                >
                                    {boardItem.name}
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};

export default BoardPage;