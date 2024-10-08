import { getProject, projects } from '$lib/data/project-list';
import { parseMarkdown, readMarkdown } from '$lib/utils/markdown';
import { generateTOC } from '$lib/utils/tableofcontents';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) 
{ 
    const project = getProject(params.slug);

    if (project == null)
        throw new Error("INVALID PROJECT ID");

    let markdown = await readMarkdown(project.file, fetch);

    let [content, frontmatter] = await parseMarkdown(markdown);

    let toc = generateTOC(content);

    return { 
        
        title: project.name, 
        content: content, 

        toc: toc,
        //page: page,
        
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