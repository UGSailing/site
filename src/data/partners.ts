export interface Vacancy {
    title: string;
    link: string;
}

export interface Partner {
    logo: string;
    name: string;
    link: string;
    description?: string;
    vacancies?: Vacancy[];
}

export const partners: Partner[] = [
    {
        logo: "/img/logos/jandenul.png",
        name: "Jan De Nul Group",
        link: "https://www.jandenul.com",
        description: "A world leader in dredging, marine engineering and offshore projects.",
        vacancies: [
        ]
    },
    {
        logo: "/img/logos/ceneka.png",
        name: "Ceneka",
        link: "https://www.ceneka.be",
        description: "De officiële studentenvereniging voor ingenieursstudenten computerwetenschappen en elektrotechniek aan Universiteit Gent",
        vacancies: [
        ]
    },
    {
        logo: "/img/logos/pkarus.png",
        name: "Pkarus",
        link: "https://www.pkarus.be",
        description: "PKarus is een vereniging door en voor studenten burgerlijk ingenieur werktuigkundig-elektrotechniek aan de UGent.",
    },
];