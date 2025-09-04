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
        name: "Generation Posseidon",
        image: "/img/.jpg",
        link: "/generation/posseidon",
    }
];