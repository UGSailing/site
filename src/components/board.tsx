import { H3 } from ".";
import BoardMemberCard from "./boardMemberCard";
import { Prisma } from '@prisma/client'


type BoardWithDetails = Prisma.BoardGetPayload<{
    include: {
        members: {
            include: {
                boardmember: true,
                image: true,
                positions: {
                    include: {
                        position: true,
                    }
                }
            }
        }
    }
}>;

const Board = ({ board }: { board: BoardWithDetails }) => {
    board.members.sort((a, b) => {
        return a.index - b.index;
    });
    return (
        <div>
            <H3 className="text-2xl font-bold mb-4 mt-7" id={`${board.year}`}>{board.name}</H3>
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3  gap-6">
                {board.members.map((boardItem, boardIndex) => (
                    <BoardMemberCard key={boardIndex} member={boardItem} />
                ))}
            </div>
        </div>
    );
}

export default Board;