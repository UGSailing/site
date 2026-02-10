import React from 'react';
import MemberYearUpdate from '@/components/admin/board/memberyear/update';
import { getPrisma } from '@/lib/auth';

export default async function MemberYearPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params; 
    const prisma = await getPrisma();
    if (prisma === null) {
        return <p>You must be logged in to view this page.</p>;
    }
    
    const boardMembers = await prisma.boardMember.findMany();
    const boards = await prisma.board.findMany();

    return (
        <>
            {
                <MemberYearUpdate 
                    boardMemberYearId={ id } 
                    boardMembers={boardMembers.map(member => ({ label: member.name, value: member.id }))} 
                    boards={boards.map(board => ({ label: board.name, value: board.id }))} 
                />
            }
        </>
    )
    
}
