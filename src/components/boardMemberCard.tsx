import { BoardMember } from "@/data/board";
import { H4 } from ".";
import HoverCard from "./ui/hover-card";

interface BoardMemberCardProps {
    member: BoardMember;
}

/**
 * A kaartje component that displays a board member's information with a hover :p.
 * @param member - The board member data containing name, image, positions, studies, and email
 */
const BoardMemberCard = ({ member }: BoardMemberCardProps) => {
    const popupContent = (member.studies && member.studies.trim() !== "") ||
            (member.email && member.email.trim() !== "")
        ? (
            <>
                <p>{member.studies}</p>
                <p>{member.email}</p>
            </>
        )
        : (
            <p className="text-sm text-gray-500 italic">
                No extra information
            </p>
        );

    return (
        <HoverCard
            className="bg-white rounded-lg border border-red-500 p-6 flex items-center hover:bg-red-50 cursor-pointer"
            content={popupContent}
        >
            {/* Circular Image */}
            <img
                src={member.image || "/img/logos/cropped_logo.png"}
                alt={`image of ${member.name}`}
                className="h-36 aspect-square object-cover rounded-full mr-6"
            />

            {/* Member Info */}
            <div className="h-full flex-1">
                <H4 className="text-xl font-semibold mt-3 mb-2">
                    {member.name}
                </H4>
                <ul className="list-disc pl-5 text-sm">
                    {member.positions.map((position, posIndex) => (
                        <li key={posIndex}>{position.name}</li>
                    ))}
                </ul>
            </div>
        </HoverCard>
    );
};

export default BoardMemberCard;
