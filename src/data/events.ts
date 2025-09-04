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
        title: "Design sprint weekend",
        date: "30-08-2025", 
        location: "The Docks, Ghent",
        description: "This weekend, we are going all in. The boat is almost finished, this weekend we will try to mount the motor.",
        image: "/images/events/cropped_logo.png",
        registration: true,
    },
    {
        id: "2",
        title: "Design sprint week",
        date: "01-09-2025",
        location: "The Docks, Ghent",
        description: "The final week to work on the boat. We want to finish everything. This week, the motor will be remounted. The rudder will be slightly adjusted. And finally the cameras for autonomous sailing will be tested.",
        image: "/images/events/cropped_logo.png",
        registration: true,
    },
    {
        id: "3",
        title: "Partnerevent",
        date: "29-09-2025",
        location: "Locus, Tech Lane Ghent Science Park, Campus A.",
        description: "Our prototype boat, which we worked a whole semester on, will be launched. Together with all our partners, we will celebrate this milestone.",
        image: "/images/events/cropped_logo.png",
        registration: true,
    }
];