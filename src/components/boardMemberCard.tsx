import {BoardMember} from "@/data/board"
import {H4} from ".";
import Image from "next/image";

const BoardMemberCard = ({member}: { member: BoardMember }) => {
    let imageUrl;
    let imageHeight;
    let imageWidth;

    if (member.image) {
        imageUrl = member.image;
        imageHeight = member.height;
        imageWidth = member.width;
    } else {
        imageUrl = "/img/logos/cropped_logo.png";
        imageHeight = 263;
        imageWidth = 637;
    }

    return (
        <div className="bg-white rounded-lg border border-red-500 p-6 flex items-center">
            {/* Circular Image */}
            <Image
                src={imageUrl}
                alt={`image of ${member.name}`}
                className="h-36 aspect-square object-cover rounded-full mr-6 w-auto"
                width={imageWidth} height={imageHeight}
                sizes="144px"
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
    );
}

export default BoardMemberCard;