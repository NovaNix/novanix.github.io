import { ProjectStatus, type Project } from "$lib/data/project";

import File from "./content.md?url";
import Icon from "./icon.jpg"

const project: Project = {
    name: "DJ Luigi",
    id: "dj-luigi",
    description: "A Discord Music Bot written in Java",
    icon: Icon,
    status: ProjectStatus.Finished,
    file: File,
    github: "https://github.com/NovaNix/DJ-Luigi"
}

export default project;