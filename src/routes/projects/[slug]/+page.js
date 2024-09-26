import { getProject, projects } from '$lib/data/projects';
import { marked } from 'marked';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) 
{ 
    const project = getProject(params.slug);

    if (project == null)
        throw new Error("INVALID PROJECT ID");

    let markdown = await (await fetch(project.file)).text();

    //console.log(project);
    //console.log(markdown);

    let content = marked.parse(markdown);

    return { 
        
        title: project.name, 
        content: content, 
        
        icon: project.icon,
        favicon: project.favicon ?? project.icon,

        project: project
    }; 
}

/** @type {import('./$types').EntryGenerator} */
export function entries() 
{
    return projects.map(value => ({slug: value.id}));
}