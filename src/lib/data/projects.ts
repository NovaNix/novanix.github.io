export interface Project
{
    name: string;
    /** A unique name given to the project. Also used for the project urls */
    id: string;
    description: string;

    icon: string;
    //test: string;

    status: ProjectStatus;

    file: string;

    github?: string;
    url?: string;

}

export enum ProjectStatus
{
    InProgress = "In Progress",
    OnHold = "On Hold",
    Finished = "Finished",
    Scrapped = "Scrapped"
}

export const projects: Project[] = [
    {
        name: "DJ Luigi",
        id: "dj-luigi",
        description: "A Discord Music Bot written in Java",
        icon: "/posts/projects/dj-luigi/icon.jpg",
        status: ProjectStatus.Finished,
        file: "/posts/projects/dj-luigi/dj-luigi.md",
    }
]

export function getProject(id: string)
{
    return projects.find(project => project.id == id);
}