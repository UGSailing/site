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
    link?: string;
}

export const events: EventType[] = [
    // {
    //     id: "1",
    //     title: "Design sprint weekend",
    //     startDate: "30-08-2025", 
    //     endDate: "31-08-2025",
    //     location: "The Docks, Ghent",
    //     intro: "The boat is almost finished, this weekend we will try to mount the motor.",
    //     description: "This weekend, we are going all in. The boat is almost finished, this weekend we will try to mount the motor.",
    //     image: "/images/events/cropped_logo.png",
    //     registration: false,
    // },
    // {
    //     id: "2",
    //     title: "Design sprint week",
    //     startDate: "01-09-2025",
    //     endDate: "07-09-2025",
    //     location: "The Docks, Ghent",
    //     intro: "The final week to work on the boat. We want to finish everything.",
    //     description: "The final week to work on the boat. We want to finish everything. This week, the motor will be remounted. The rudder will be slightly adjusted. And finally the cameras for autonomous sailing will be tested.",
    //     image: "/images/events/cropped_logo.png",
    //     registration: false,
    // },
    // {
    //     id: "3",
    //     title: "Partnerevent",
    //     startDate: "29-09-2025",
    //     location: "Locus, Tech Lane Ghent Science Park, Campus A.",
    //     intro: "Our prototype boat, which we worked a whole semester on, will be launched.",
    //     description: "Our prototype boat, which we worked a whole semester on, will be launched. Together with all our partners, we will celebrate this milestone.",
    //     image: "/images/events/cropped_logo.png",
    //     registration: false,
    // },
    {
        "id": "4",
        "title": "Design Sprint Autonomous",
        "startDate": "10-11-2025, 16:00",
        "endDate": "10-11-2025, 23:00",
        "location": "The Docks, Ghent (Campus Ardoyen, Building 125, second floor)",
        "intro": "",
        "image": "/img/logos/cropped_logo.png",
        "registration": false
    },
    {
        "id": "5",
        "title": "Siemens NX Workshop 2",
        "startDate": "18-11-2025, 9:00",
        "endDate": "18-11-2025, 12:00",
        "location": "Building 125, Room 0.3, Tech Lane Ghent Science Park, Campus Ardoyen",
        "intro": "Join our Siemens NX workshops to level up your CAD skills. Sessions cover basics, assemblies, topology optimization and composites. Bring your laptop with NX installed.",
        "image": "/img/logos/cropped_logo.png",
        "registration": false,
        "link": "/event/siemens"
    },
    {
        "id": "6",
        "title": "Design Sprint Electrical",
        "startDate": "18-11-2025, 16:00",
        "endDate": "18-11-2025, 23:00",
        "location": "The Docks, Ghent (Campus Ardoyen, Building 125, second floor)",
        "intro": "Join us for a dynamic sprint where we’ll brainstorm algorithms and explore technologies for autonomous sailing, all while enjoying free food and drinks!",
        "description": `Time to think smart! 🧠
This sprint is all about the brains behind our boat — we’ll be brainstorming algorithms, exploring new technologies, and researching the components that will make autonomy a reality.

Whether you’re into coding, electronics, or creative problem-solving, this is your chance to shape how our system will think and act on its own. ⚙️

🍕 Free food & drinks all evening — fuel for innovation!

Let’s build the future of autonomous sailing together 🌊✨`,
        "image": "/img/logos/cropped_logo.png",
        "registration": false
    },
    {
        "id": "7",
        "title": "Siemens NX Workshop 3",
        "startDate": "25-11-2025, 9:00",
        "endDate": "25-11-2025, 12:00",
        "location": "Building 125, Room 0.3, Tech Lane Ghent Science Park, Campus Ardoyen",
        "intro": "Join our Siemens NX workshops to level up your CAD skills. Sessions cover basics, assemblies, topology optimization and composites. Bring your laptop with NX installed.",
        "image": "/img/logos/cropped_logo.png",
        "registration": false,
        "link": "/event/siemens"
    },
    {
        "id": "8",
        "title": "Siemens NX Workshop 4",
        "startDate": "02-12-2025, 9:00",
        "endDate": "02-12-2025, 12:00",
        "location": "Building 125, Room 0.3, Tech Lane Ghent Science Park, Campus Ardoyen",
        "intro": "Join our Siemens NX workshops to level up your CAD skills. Sessions cover basics, assemblies, topology optimization and composites. Bring your laptop with NX installed.",
        "image": "/img/logos/cropped_logo.png",
        "registration": false,
        "link": "/event/siemens"
    },
];