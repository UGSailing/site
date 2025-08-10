import BoardMemberCard from "./boardMemberCard";
import { Board as BoardType } from "@/data/board";

const Board = ({ board }: { board: BoardType }) => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4" id={board.HTMLid}>{board.name}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3  gap-6">
                {board.members.map((boardItem, boardIndex) => (
                    <BoardMemberCard key={boardIndex} member={boardItem} />
                ))}
            </div>
        </div>
    );
}

export default Board;