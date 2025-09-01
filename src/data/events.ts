export interface EventType {
    id: string;
    title: string;
    date: string;
    location: string;
    description?: string;
    image?: string;
    registration: boolean;
}

export const events: EventType[] = [
    {
        id: "1",
        title: "Introduction to Sailing",
        date: "2024-09-15",
        location: "Ghent Sailing Clubhouse",
        description: "An introductory session for new members to learn the basics of sailing.",
        image: "/images/events/cropped_logo.png",
        registration: true,
    },
    {
        id: "2",
        title: "Autumn Regatta",
        date: "2025-10-10",
        location: "Ghent Sailing Clubhouse",
        description: "Join us for our annual autumn regatta. Open to all skill levels.",
        image: "/images/events/cropped_logo.png",
        registration: true,
    },
    {
        id: "3",
        title: "Sailing Workshop",
        date: "2025-11-05",
        location: "Ghent Sailing Clubhouse",
        description: "A hands-on workshop focusing on advanced sailing techniques.",
        image: "/images/events/cropped_logo.png",
        registration: false,
    },
    {
        id: "4",
        title: "Winter Social Event",
        date: "2025-12-20",
        location: "Ghent Sailing Clubhouse",
        description: "Celebrate the end of the year with fellow sailors. Food and drinks provided.",
        image: "/images/events/cropped_logo.png",
        registration: false,
    },
];