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

/**
 * Takes a tutorial tree and converts it into a flat list. This is used to determine the order of tutorials.
 * This flattened list will only include nodes with files. If a node has a file, it will be places before it's children.
 * 
 * This function is recursive. 
 * @param root 
 */
export function flattenTree(root: ITutorialNode): ITutorialNode[]
{
    let flat: ITutorialNode[] = [];

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

export function toTreeNode(tutorial: ITutorialNode, path: string | null): ITreeNode
{
    let url = (path ?? "/tutorials") + "/" + tutorial.slug;
    let children: ITreeNode[] | undefined = [];

    for (let child of tutorial.children ?? [])
    {
        children.push(toTreeNode(child, url));
    }

    if (children.length == 0)
        children = undefined;

    return {
        text: tutorial.title,
        url,

        children
    }
}