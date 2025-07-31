import { type Team } from "./teams";
import teams from "./teams";


export type Status = {
    id: string;
    name: string;
    color: string;
    symbol: string;
}

export type Priority = {
    id: string;
    name: string;
    color: string;
    symbol: string;
}

export type ToDo = {
    id: string;
    title: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
    dependsOn?: ToDo[];
    teams?: Team[];
    notes?: string;
    status?: Status;
    priority?: Priority;
}

export const statuses: Status[] = [
    {
        id: "todo",
        name: "To Do",
        color: "#00ff00",
        symbol: "<i class='icon-[tabler--ship-off]' style=\"color: '#00ff00'\"></i>"
    },
    {
        id: "in-progress",
        name: "In Progress",
        color: "#ffaa00",
        symbol: "<i class='icon-[tabler--ship-off]' style=\"color: '#ffaa00'\"></i>"
    },
    {
        id: "done",
        name: "Done",
        color: "#ff0000",
        symbol: "<i class='icon-[bi--check]' style=\"color: '#ff0000'\"></i>"
    }
]

export const priorities: Priority[] = [
    {
        id: "low",
        name: "Low",
        color: "#00ff00",
        symbol: "<i class='icon-[bi--circle-fill]' style=\"color: '#00ff00'\"></i>"
    },
    {
        id: "medium",
        name: "Medium",
        color: "#ffff00",
        symbol: "<i class='icon-[bi--circle-fill]' style=\"color: '#ffaa00'\"></i>"
    },
    {
        id: "high",
        name: "High",
        color: "#ff0000",
        symbol: "<i class='icon-[bi--circle-fill]' style=\"color: '#ff0000'\"></i>"
    }
]

const todos: ToDo[] = [
    {
        id: "1",
        title: "Fix website",
        completed: false,
        createdAt: new Date("2023-10-01"),
        updatedAt: new Date("2023-10-02"),
        teams: [teams.web],
        notes: "Check the weather and prepare the boat.",
        status: statuses[0],
        priority: priorities[1]
    }
];

export default todos;