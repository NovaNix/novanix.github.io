import DJLuigi from "$lib/posts/projects/dj-luigi/project"
import KKRadio from "$lib/posts/projects/kk-radio/project"
import { ProjectStatus, type Project } from "$lib/types/projecttypes";

export const projects: Project[] = [
    DJLuigi,
    KKRadio
    
]

export function getProject(id: string)
{
    return projects.find(project => project.id == id);
}