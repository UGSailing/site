export type Team = {
    name: string;
    description: string;
}

const teams: Record<string, Team> = {
    autonomous: {
        name: "Autonomous",
        description: "A team focused on developing autonomous systems for the boat."
    },
    construction: {
        name: "Construction",
        description: "A team dedicated to construction of the boat."
    },
    electronics: {
        name: "Electronics",
        description: "A team responsible for the electronics and electrical systems."
    },
    design: {
        name: "Design",
        description: "A team focused on the design aspects of the boat."
    },
    energy: {
        name: "Energy",
        description: "A team that manages energy systems and sustainability."
    },
    web: {
        name: "Web",
        description: "A team that handles the web development and online presence."
    }
}

export default teams;
