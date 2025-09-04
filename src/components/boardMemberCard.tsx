import { BoardMember } from "@/data/board"
import { H4 } from ".";

const BoardMemberCard = ({ member }: { member: BoardMember }) => (
    <div className="bg-white rounded-lg border border-red-500 p-6 flex items-center">
        {/* Circular Image */}
        <img 
            src={member.image || "/img/logos/cropped_logo.png"} 
            alt= {`image of ${member.name}`}
            className="h-36 aspect-square object-cover rounded-full mr-6" 
        />
        {/* Member Information */}
        <div className="h-full">
            <H4 className="text-xl font-semibold h-2/6 mt-3 mb-2">{member.name}</H4>
            <ul className="list-disc pl-5">
                {
                    member.positions.map((position, posIndex) => (
                        <li key={posIndex}>{position.name}</li>
                    ))
                }
            </ul>
        </div>
    </div>
)

export default BoardMemberCard;