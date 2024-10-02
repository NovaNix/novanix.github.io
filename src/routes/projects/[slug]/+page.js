import { getProject, projects } from '$lib/data/project-list';
import { generateTOC } from '$lib/utils/tableofcontents';
import { marked } from 'marked';
import { gfmHeadingId } from 'marked-gfm-heading-id';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) 
{ 
    const project = getProject(params.slug);

    if (project == null)
        throw new Error("INVALID PROJECT ID");

    let markdown = await (await fetch(project.file)).text();

    // configure marked
    marked.use(gfmHeadingId()); // Add unique IDs to headers

    let content = await marked.parse(markdown);

    //let document = parse5.parse(content);

    let toc = generateTOC(content);

    //console.log(content);

    //let page = new DOMParser().parseFromString(content, "text/xml");
    //let page = 

    //let toc = generateTOC(page.documentElement);

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