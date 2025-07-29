type Position = {
    name: string;
    description: string;
    email?: string;
}

type BoardMember = {
    name: string;
    positions: Position[];
    image: string;
    index: number;
}

type Board = {
    members: BoardMember[];
    year: number;
}

const positions: Position[] = [
    { name: 'Captain Extern', description: '' },
    { name: 'Captain Intern', description: '' },
    { name: 'Treasurer', description: 'Manages the financial affairs of the organization.' },
    { name: 'Web', description: 'Responsible for the website and online presence.' },
    { name: 'PR', description: 'Handles public relations and communication.' },
    { name: 'Corporate', description: 'Manages corporate partnerships and sponsorships.' },

    // Teams
    { name: 'Team Autonomous', description: 'Focuses on autonomous systems and robotics.' },
    { name: 'Team Construction', description: 'Responsible for the construction and design of physical structures.' },
    { name: 'Team Electronics', description: 'Handles electronic components and systems.' },
    { name: 'Team Design', description: 'Focuses on design aspects of projects.' },
    { name: 'Team Energy', description: 'Works on energy systems and sustainability.' },

    // Volunteers
    { name: 'Volunteer Autonomous', description: 'Assists the Autonomous team with various tasks.' },
    { name: 'Volunteer Construction', description: 'Supports the Construction team in building projects.' },
    { name: 'Volunteer Electronics', description: 'Helps the Electronics team with circuit design and assembly.' },
    { name: 'Volunteer Design', description: 'Aids the Design team in creating visual materials.' },
    { name: 'Volunteer Energy', description: 'Assists the Energy team with energy-related tasks.' }
];

const board: Board[] = [
    {
        "year": 2025,
        "members": [
            {
                index: 0,
                name: "Anaë Verbinnen",
                image: "/img/people/anae.jpg",
                positions: [
                    positions[2], // Treasurer
                    positions[7], // Team Construction
                ]
            },
            {
                index: 1,
                name: "Jorien Baert",
                image: "/img/people/jorien.jpg",
                positions: [
                    positions[0], // Captain Extern
                    positions[6], // Team Autonomous
                ]
            },
            {
                index: 2,
                name: "Robin Aerts",
                image: "/img/people/robin.jpg",
                positions: [
                    positions[1], // Captain Intern
                    positions[6], // Team Autonomous
                ]
            },
            {
                index: 3,
                name: "Wannes Sys",
                image: "/img/people/wannes.jpg",
                positions: [
                    positions[3], // Web
                ]
            },
            {
                index: 4,
                name: "Mathieu Moernaut",
                image: "/img/people/mathieu.jpg",
                positions: [
                    positions[7], // Team Construction
                ]
            },
            {
                index: 4,
                name: "Thomas Van Acker",
                image: "/img/people/rodo_thomas.jpg",
                positions: [
                    positions[8], // Team Electronics
                ]
            },
            {
                index: 4,
                name: "Simeon Demeester",
                image: "/img/people/simeon.jpg",
                positions: [
                    positions[6], // Team Autonomous
                ]
            },
            {
                index: 4,
                name: "Michiel De Paepe",
                image: "/img/people/michiel.jpg",
                positions: [
                    positions[13], // Volunteer Electronics
                ]
            },
            {
                index: 4,
                name: "Arne Moreels",
                image: "/img/people/arne.jpg",
                positions: [
                    positions[13], // Volunteer Electronics
                ]
            },
            {
                index: 4,
                name: "August Adams",
                image: "/img/people/august.jpg",
                positions: [
                    positions[13], // Volunteer Electronics
                ]
            },
            {
                index: 4,
                name: "Arthur Van Damme",
                image: "/img/people/arthur.jpg",
                positions: [
                    positions[11], // Volunteer Autonomous
                ]
            },
            {
                index: 4,
                name: "Guillaume Verlodt",
                image: "/img/people/guillaume.jpg",
                positions: [
                    positions[11], // Volunteer Autonomous
                ]
            },
            {
                index: 4,
                name: "Thomas De Meulenaar",
                image: "/img/people/oranje_thomas.jpg",
                positions: [
                    positions[13], // Volunteer Electronics
                ]
            },
            {
                index: 4,
                name: "Sander Van Laere",
                image: "/img/people/sander.jpg",
                positions: [
                    positions[11], // Volunteer Autonomous
                ]
            },
        ]
    }
]

export default board;