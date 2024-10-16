import { getRootTutorial, getSiblingTutorials, getTutorialPage, toTreeNode, tutorials } from '$lib/data/tutorial-list';
import { parseMarkdown, readMarkdown } from '$lib/utils/markdown';
import { generateTOC } from '$lib/utils/tableofcontents';
import { error } from '@sveltejs/kit';

import { read } from '$app/server';

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch, params })
{
    //console.log("slug: " + params.slug);
    const tutorial = getRootTutorial(params.slug);
    const page = getTutorialPage(params.slug);

    if (tutorial == null || page == null)
        error(404, {
			message: 'Not found'
	});

    const sideTree = [toTreeNode(tutorial)];

    const [prevPage, nextPage] = getSiblingTutorials(tutorial, page);
    let prev = prevPage ? {name: prevPage.title, url: prevPage.url} : null;
    let next = nextPage ? {name: nextPage.title, url: nextPage.url} : null;

    let crumbs = getBreadcrumbs(page);

    //console.log(prev);
    //console.log(next);

    // Extract the article contents
    
    let content; 
    let frontmatter;

    let toc;

    if (page.file)
    {
        let markdown = await read(page.file).text();
        //let markdown = await readMarkdown(page.file, fetch);
        //let markdown = await readMarkdown(page.file, );

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

        prev,
        next,

        crumbs,

        toc,

        path: params.slug
    };
}

/**
 * 
 * @param {import('$lib/data/tutorial').ITutorialNode} page 
 */
function getBreadcrumbs(page)
{
    /** @type {import('$lib/types/types').LabeledLink[]} */
    let crumbs = [];

    /** @type {import('$lib/data/tutorial').ITutorialNode | null} */
    let next = page;

    while (next != null)
    {
        crumbs.push({
            name: next.title,
            url: next.url
        });

        next = next.parent;
    }

    return crumbs.toReversed();
}

/** @type {import('./$types').EntryGenerator} */
export function entries() 
{
    return tutorials.map(value => ({slug: value.slug}));
}