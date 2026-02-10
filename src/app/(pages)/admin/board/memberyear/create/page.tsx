import prisma from "@/prisma";
import MemberYear from "@/components/admin/board/memberyear/create";
import { getPrisma } from '@/lib/auth';

export default async function CreateMemberYearPage() {
    const prisma = await getPrisma();
    if (prisma === null) {
        return <p>You must be logged in to view this page.</p>;
    }
    
    const boardMembers = await prisma.boardMember.findMany();
    const boards = await prisma.board.findMany();
    return <MemberYear 
        boardMembers={boardMembers.map(member => ({ label: member.name, value: member.id }))} 
        boards={boards.map(board => ({ label: board.name, value: board.id }))} 
    />
}