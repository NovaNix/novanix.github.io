import type { ITutorialNode, Tutorial } from "./tutorial";

import TestTutorial from "$lib/posts/tutorials/test-tutorial/tutorial"
import type { ITreeNode } from "$lib/types/treetypes";

export const tutorials: Tutorial[] = [
    TestTutorial
    
]

export function getRootTutorial(slug: string)
{
    let parts = slug.split("/");

    return tutorials.find(tutorial => tutorial.slug == parts[0]);
}

export function getTutorialPage(path: string): ITutorialNode | undefined
{
    let parts = path.split("/");
    parts = parts.toReversed();

    let node: ITutorialNode | undefined;
    let children: ITutorialNode[] = tutorials;

    while (parts.length > 0)
    {
        let part = parts.pop();

        node = children.find(value => value.slug == part);

        if (node == null)
            return undefined;

        children = node.children ?? [];
    }

    return node;
}

export function getSiblingTutorials(tutorial: Tutorial, page: ITutorialNode): [ITutorialNode | null, ITutorialNode | null]
{
    let flat = flattenTree(tutorial);

    let index = flat.indexOf(page);

    if (index == -1)
        return [null, null];

    let previous = index != 0 ? flat[index - 1] : null;
    let next = (index + 1) < flat.length ? flat[index + 1] : null;
    
    return [previous, next];
}

/**
 * Takes a tutorial tree and converts it into a flat list. This is used to determine the order of tutorials.
 * This flattened list will only include nodes with files. If a node has a file, it will be places before it's children.
 * 
 * This function is recursive. 
 * @param root 
 */
export function flattenTree(root: ITutorialNode, path: string = ""): ITutorialNode[]
{
    let flat: ITutorialNode[] = [];

    //let url = `${path}/${root.slug}`;
    //let urlRoot = {...root, url};

    // Add the root node if it has a file
    if (root.file)
        flat.push(root);

    if (root.children == null)
        return flat;

    // Add the child nodes and their children
    for (let child of root.children)
    {
        flat = [...flat, ...flattenTree(child)];
    }

    return flat;
}

export function toTreeNode(tutorial: ITutorialNode): ITreeNode
{
    let url = tutorial.url;
    let children: ITreeNode[] | undefined = [];

    for (let child of tutorial.children ?? [])
    {
        children.push(toTreeNode(child));
    }

    if (children.length == 0)
        children = undefined;

    return {
        text: tutorial.title,
        url,

        children
    }
}