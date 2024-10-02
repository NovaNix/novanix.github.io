import DJLuigi from "$lib/posts/projects/dj-luigi/project"
import KKRadio from "$lib/posts/projects/kk-radio/project"
import { ProjectStatus, type Project } from "$lib/data/project";

// Note: project-list and project are separated to prevent circular imports (they cause annoying issues...)

export const projects: Project[] = [
    DJLuigi,
    KKRadio
    
]

export function getProject(id: string)
{
    return projects.find(project => project.id == id);
}