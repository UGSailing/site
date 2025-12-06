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
        title: "Design sprint weekend",
        startDate: "30-08-2025", 
        endDate: "31-08-2025",
        location: "The Docks, Ghent",
        intro: "The boat is almost finished, this weekend we will try to mount the motor.",
        description: "This weekend, we are going all in. The boat is almost finished, this weekend we will try to mount the motor.",
        image: "/images/events/cropped_logo.png",
        registration: false,
    },
    {
        id: "2",
        title: "Design sprint week",
        startDate: "01-09-2025",
        endDate: "07-09-2025",
        location: "The Docks, Ghent",
        intro: "The final week to work on the boat. We want to finish everything.",
        description: "The final week to work on the boat. We want to finish everything. This week, the motor will be remounted. The rudder will be slightly adjusted. And finally the cameras for autonomous sailing will be tested.",
        image: "/images/events/cropped_logo.png",
        registration: false,
    },
    {
        id: "3",
        title: "Partnerevent",
        startDate: "29-09-2025",
        location: "Locus, Tech Lane Ghent Science Park, Campus A.",
        intro: "Our prototype boat, which we worked a whole semester on, will be launched.",
        description: "Our prototype boat, which we worked a whole semester on, will be launched. Together with all our partners, we will celebrate this milestone.",
        image: "/images/events/cropped_logo.png",
        registration: false,
    },
    {
        id: "4",
        title: "upcoming event",
        startDate: "29-10-2025",
        location: "Locus, Tech Lane Ghent Science Park, Campus A.",
        intro: "Our prototype boat, which we worked a whole semester on, will be launched.",
        description: "Our prototype boat, which we worked a whole semester on, will be launched. Together with all our partners, we will celebrate this milestone.",
        image: "/images/events/cropped_logo.png",
        registration: false,
    },
    {
        id: "5",
        title: "Further events",
        startDate: "29-11-2025",
        location: "Locus, Tech Lane Ghent Science Park, Campus A.",
        intro: "Our prototype boat, which we worked a whole semester on, will be launched.",
        description: "Our prototype boat, which we worked a whole semester on, will be launched. Together with all our partners, we will celebrate this milestone.",
        image: "/images/events/cropped_logo.png",
        registration: false,
    }
];