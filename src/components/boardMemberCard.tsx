import { BoardMember } from "@/data/board"

const BoardMemberCard = ({ member }: { member: BoardMember }) => (
    <div className="bg-white rounded-lg shadow p-6 flex items-center dark:bg-gray-800">
        {/* Circular Image */}
        <img 
            src={member.image} 
            alt= {`image of ${member.name}`}
            className="w-36 h-36 object-cover rounded-full mr-6" 
        />
        {/* Member Information */}
        <div className="h-full">
            <h3 className="text-xl font-semibold h-2/6 mt-3 mb-2">{member.name}</h3>
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