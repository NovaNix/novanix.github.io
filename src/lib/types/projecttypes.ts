export interface Project
{
    name: string;
    /** A unique name given to the project. Also used for the project urls */
    id: string;
    description: string;

    icon: string;
    favicon?: string;
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