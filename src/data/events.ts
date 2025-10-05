export interface EventType {
    id: string;
    title: string;
    startDate: string;
    endDate?: string;
    location: string;
    intro: string;
    description?: string;
    image?: string;
    registration: boolean;
}

export const events: EventType[] = [
    {
        id: "1",
        title: "Design sprint",
        startDate: "07-10-2025", 
        location: "The Docks, Ghent",
        intro: "CONSTRUCTION DESIGN SPRINT! We’ll dive into stability & strength calculations and kick off the construction phase of our new ship!",
        description: "CONSTRUCTION DESIGN SPRINT",
        image: "/images/events/cropped_logo.png",
        registration: false,
    },
];