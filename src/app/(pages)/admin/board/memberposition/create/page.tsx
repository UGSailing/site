import MemberPosition from "@/components/admin/board/memberposition/create";
import { getPrisma } from "@/lib/auth";
import { requireRole } from '@/lib/auth-helpers';
import { ROLES } from '@/lib/auth-types';
import { Http403 } from '@/components/http';


export default async function MemberPositionPage() {
    const role = await requireRole(ROLES.TEAM)
    if (role.status == 403) {
        return <Http403/>
    }
    const prisma = await getPrisma();
    if (prisma === null) {
        return <p>You must be logged in to view this page.</p>;
    }

    const boardMemberYears = await prisma.boardMemberYear.findMany(
        {
            include: {
                board: true,
                boardmember: true,
            }
        }
    );
    const positions = await prisma.position.findMany();
    return <MemberPosition 
        boardMemberYears={boardMemberYears.map(by => ({ label: `${by.board.name} - ${by.boardmember.name} (${by.board.year})`, value: by.id }))} 
        positions={positions.map(position => ({ label: position.name, value: position.id }))}
    />;
}