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
    name: string;
    HTMLid: string;
    year: number;
}

const positions: Record<string, Position> = {
    "Captain Extern": { name: 'Captain Extern', description: '' },
    "Captain Intern": { name: 'Captain Intern', description: '' },
    "Treasurer": { name: 'Treasurer', description: 'Manages the financial affairs of the organization.' },
    "Web": { name: 'Web', description: 'Responsible for the website and online presence.' },
    "PR": { name: 'PR', description: 'Handles public relations and communication.' },
    "Corporate": { name: 'Corporate', description: 'Manages corporate partnerships and sponsorships.' },

    // Teams
    "Team Autonomous": { name: 'Team Autonomous', description: 'Focuses on autonomous systems and robotics.' },
    "Team Construction": { name: 'Team Construction', description: 'Responsible for the construction and design of physical structures.' },
    "Team Electronics": { name: 'Team Electronics', description: 'Handles electronic components and systems.' },
    "Team Design": { name: 'Team Design', description: 'Focuses on design aspects of projects.' },
    "Team Energy": { name: 'Team Energy', description: 'Works on energy systems and sustainability.' },

    // Volunteers
    "Volunteer Autonomous": { name: 'Volunteer Autonomous', description: 'Assists the Autonomous team with various tasks.' },
    "Volunteer Construction": { name: 'Volunteer Construction', description: 'Supports the Construction team in building projects.' },
    "Volunteer Electronics": { name: 'Volunteer Electronics', description: 'Helps the Electronics team with circuit design and assembly.' },
    "Volunteer Design": { name: 'Volunteer Design', description: 'Aids the Design team in creating visual materials.' },
    "Volunteer Energy": { name: 'Volunteer Energy', description: 'Assists the Energy team with energy-related tasks.' }
};

const board: Board[] = [
    {
        year: 2025, // used for sorting
        name: "Board 2025-2026",
        HTMLid: "2025-2026",
        members: [
            {
                index: 0,
                name: "Anaë Verbinnen",
                image: "/img/people/Anaë Verbinnen.jpg",
                positions: [
                    positions["Treasurer"],
                    positions["Team Construction"], 
                ]
            },
            {
                index: 1,
                name: "Jorien Baert",
                image: "/img/people/Jorien Baert.jpg",
                positions: [
                    positions["Captain Extern"],
                    positions["Team Autonomous"],
                ]
            },
            {
                index: 2,
                name: "Robin Aerts",
                image: "/img/people/Robin Aerts.jpg",
                positions: [
                    positions["Captain Intern"],
                    positions["Team Autonomous"],
                ]
            },
            {
                index: 3,
                name: "Wannes Sys",
                image: "/img/people/Wannes Sys.jpg",
                positions: [
                    positions["Web"],
                ]
            },
            {
                index: 4,
                name: "Mathieu Moernaut",
                image: "/img/people/Mathieu Moernaut.jpg",
                positions: [
                    positions["Team Construction"],
                ]
            },
            {
                index: 4,
                name: "Thomas Van Acker",
                image: "/img/people/Thomas Van Acker.jpg",
                positions: [
                    positions["Team Electronics"]
                ]
            },
            {
                index: 4,
                name: "Simeon Demeester",
                image: "/img/people/Simeon Demeester.jpg",
                positions: [
                    positions["Team Autonomous"]
                ]
            },
            {
                index: 4,
                name: "Michiel De Paepe",
                image: "/img/people/Michiel De Paepe.jpg",
                positions: [
                    positions["Volunteer Electronics"]
                ]
            },
            {
                index: 4,
                name: "Arne Moreels",
                image: "/img/people/Arne Moreels.jpg",
                positions: [
                    positions["Volunteer Electronics"]
                ]
            },
            {
                index: 4,
                name: "August Adams",
                image: "/img/people/August Adams.jpg",
                positions: [
                    positions["Volunteer Electronics"]
                ]
            },
            {
                index: 4,
                name: "Arthur Van Damme",
                image: "/img/people/Arthur Van Damme.jpg",
                positions: [
                    positions["Volunteer Autonomous"]
                ]
            },
            {
                index: 4,
                name: "Guillaume Verlodt",
                image: "/img/people/Guillaume Verlodt.jpg",
                positions: [
                    positions["Volunteer Autonomous"]
                ]
            },
            {
                index: 4,
                name: "Thomas De Meulenaer",
                image: "/img/people/Thomas De Meulenaer.jpg",
                positions: [
                    positions["Volunteer Electronics"]
                ]
            },
            {
                index: 4,
                name: "Sander Van Laere",
                image: "/img/people/Sander Van Laere.jpg",
                positions: [
                    positions["Volunteer Autonomous"]
                ]
            },
        ]
    }
]

export default board;
export {
    positions,
    type Position,
    type BoardMember,
    type Board
}