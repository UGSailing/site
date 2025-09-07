export interface Generation {
    year: string;
    dateLaunch?: string;
    name: string;
    image: string;
    link?: string;
}

export const generations: Generation[] = [
    {
        year: "2025-2025",
        dateLaunch: "09/2025",
        name: "Gen 0",
        image: "/img/gen0.jpg",
        // link: "/generation/posseidon",
    },
    {
        year: "2025-2026",
        // dateLaunch: "07/2026",
        name: "Gen 1",
        image: "/img/coming_soon.png",
        // link: "/generation/neptune",
    }
];