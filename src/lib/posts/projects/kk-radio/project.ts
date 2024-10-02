import { ProjectStatus, type Project } from "$lib/data/project";

import File from "./content.md?url";
//import Icon from "./icon.jpg"

const project: Project = {
    name: "K.K. Radio",
    id: "kk-radio",
    description: "",
    icon: "https://dodo.ac/np/images/e/e2/Portable_Radio_%28White%29_NH_Icon.png",
    status: ProjectStatus.Finished,
    file: File,
    github: "https://github.com/NovaNix/kk-radio",
    url: "https://novanix.github.io/kk-radio/"
}

export default project;