import { H4 } from ".";
import { Prisma } from '@prisma/client'

type BoardMemberWithDetails = Prisma.BoardMemberYearGetPayload<{
    include: {
        boardmember: true,
        image: true,
        positions: {
            include: {
                position: true,
            }
        }
    }
}>;

/**
 * A kaartje component that displays a board member's information with a hover :p.
 * @param member - The board member data containing name, image, positions, studies, and email
 */
const BoardMemberCard = ({ member }: { member: BoardMemberWithDetails} ) => {
    // const popupContent = (member.studies && member.studies.trim() !== "") ||
    //         (member.email && member.email.trim() !== "")
    //     ? (
    //         <>
    //             {member.studies && member.studies.trim() !== "" && (
    //                 <p>{member.studies}</p>
    //             )}
    //             {member.email && member.email.trim() !== "" && (
    //                 <a
    //                     href={`mailto:${member.email}`}
    //                     className="flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:underline"
    //                 >
    //                     📧 {member.email}
    //                 </a>
    //             )}
    //         </>
    //     )
    //     : (
    //         <p className="text-sm text-gray-500 italic">
    //             No extra information
    //         </p>
    //     );

    return (
        <div className="bg-white rounded-lg border border-red-500 p-6 flex items-center hover:bg-red-50">
        { /* <HoverCard
            className="bg-white rounded-lg border border-red-500 p-6 flex items-center hover:bg-red-50"
            content={popupContent}
            popupClassName="transition-all duration-200 transform opacity-0 scale-95 hover:opacity-100 hover:scale-100"
        > */ }
            {/* Circular Image */}
            <img
                src={member.image?.filepath || "/img/logos/cropped_logo.png"}
                alt={`image of ${member.boardmember.name}`}
                className="h-36 aspect-square object-cover rounded-full mr-6"
            />

            {/* Member Info */}
            <div className="h-full flex-1">
                <H4 className="text-xl font-semibold mt-3 mb-2 h-2/6">
                    {member.boardmember.name}
                </H4>
                <ul className="list-disc pl-5 text-sm">
                    {member.positions.sort((a, b) => a.position.index - b.position.index).map((position, posIndex) => (
                        <li key={posIndex}>{position.position.name}</li>
                    ))}
                </ul>
            </div>
        {/* </HoverCard> */}
        </div>
    );
};

export default BoardMemberCard;
