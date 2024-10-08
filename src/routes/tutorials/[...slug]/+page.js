import { getRootTutorial, getTutorialPage, toTreeNode, tutorials } from '$lib/data/tutorial-list';
import { parseMarkdown, readMarkdown } from '$lib/utils/markdown';
import { generateTOC } from '$lib/utils/tableofcontents';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params })
{
    //console.log("slug: " + params.slug);
    let tutorial = getRootTutorial(params.slug);
    let page = getTutorialPage(params.slug);

    if (tutorial == null || page == null)
        error(404, {
			message: 'Not found'
		});

    let sideTree = toTreeNode(tutorial, null).children;

    // Extract the article contents
    
    let content; 
    let frontmatter;

    let toc;

    if (page.file)
    {
        let markdown = await readMarkdown(page.file, fetch);

        [content, frontmatter] = await parseMarkdown(markdown);

        toc = generateTOC(content);
    }

    return {
        // tutorial: tutorial,
        tutorial,
        page,

        content,
        frontmatter,

        sideTreeTitle: tutorial.title,
        sideTree,

        toc,

        path: params.slug
    };
}

/** @type {import('./$types').EntryGenerator} */
export function entries() 
{
    return tutorials.map(value => ({slug: value.slug}));
}