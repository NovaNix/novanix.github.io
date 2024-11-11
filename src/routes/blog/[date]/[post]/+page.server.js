import { read } from '$app/server';
import { getBlog } from '$lib/data/blog-list';
import { parseMarkdown } from '$lib/utils/markdown';
import { generateTOC } from '$lib/utils/tableofcontents';

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch, params }) 
{
    const date = params.date;
    const name = params.post;

    const post = getBlog(date, name);

    if (post == null)
        throw new Error("INVALID BLOG POST");

    let markdown = await read(post.file).text();
    //let markdown = await readMarkdown(project.file, fetch);

    let renderedMarkdown = await parseMarkdown(markdown);

    let toc = generateTOC(renderedMarkdown.html);

    return { 
        
        title: post.title, 
        renderedMarkdown,

        toc: toc,
        //page: page,
        
        // icon: project.icon,
        // favicon: project.favicon ?? project.icon,

        blogPost: post,

        // project: project
    }; 
}

// /** @type {import('./$types').EntryGenerator} */
// export function entries() 
// {
//     return projects.map(value => ({slug: value.id}));
// }