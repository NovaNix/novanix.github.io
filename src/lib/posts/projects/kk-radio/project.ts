import { ProjectStatus, type Project } from "$lib/data/project";

import File from "./content.md?url";
import Icon from "./icon.png"

const project: Project = {
    name: "K.K. Radio",
    id: "kk-radio",
    description: "",
    icon: Icon,
    status: ProjectStatus.Finished,
    file: File,
    github: "https://github.com/NovaNix/kk-radio",
    url: "https://novanix.github.io/kk-radio/"
}

export default project;