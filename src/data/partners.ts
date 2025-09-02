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
        logo: "/img/logos/ceneka.png",
        name: "Ceneka",
        link: "https://www.ceneka.be",
        description: "De officiële studentenvereniging voor ingenieursstudenten computerwetenschappen en elektrotechniek aan Universiteit Gent",
        vacancies: [
            {
                title: "Stagiair Software Development",
                link: "https://www.ceneka.be/vacatures/stagiair-software-development"
            },
            {
                title: "Stagiair IT Support",
                link: "https://www.ceneka.be/vacatures/stagiair-it-support"
            }
        ]
    },
    {
        logo: "/img/logos/pkarus.png",
        name: "Pkarus",
        link: "https://www.pkarus.be",
        description: "PKarus is een vereniging door en voor studenten burgerlijk ingenieur werktuigkundig-elektrotechniek aan de UGent.",
    },
    {
        logo: "/img/logos/jandenul.png",
        name: "Jan De Nul Group",
        link: "https://www.jandenul.com",
        description: "A world leader in dredging, marine engineering and offshore projects.",
        vacancies: [
            {
                title: "Internship Opportunities",
                link: "https://www.jandenul.com/careers/internships"
            }
        ]
    }
];