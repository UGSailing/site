export interface Generation {
    year: string;
    dateLaunch?: string;
    name: string;
    image: string;
    link?: string;
}

export const generations: Generation[] = [
    {
        year: "2023-2024",
        dateLaunch: "09/2023",
        name: "Generation Neptune",
        image: "/img/board2324.jpg",
        link: "/generation/neptune",
    },
    {
        year: "2024-2025",
        dateLaunch: "09/2024",
        name: "Generation Poseidon",
        image: "/img/board2425.jpg",
        link: "/generation/poseidon",
    },
    {
        year: "2025-2026",
        name: "Next Generation",
        image: "/img/placeholderBoat.png",
    }
];