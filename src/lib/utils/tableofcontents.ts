import type { ITreeNode } from "$lib/types/treetypes";
import { parse } from "parse5";

interface Parse5Node
{
    nodeName: string;
    childNodes?: Parse5Node[];

    attrs?: Attribute[] | undefined;

    value?: string;
}

interface Attribute {
    name: string;
    value: string;
};

export function generateTOC(article: string): ITreeNode[]
{
    const document = parse(article);
    
	// There's no easy function inside of HTMLElement that returns all of the headers
    // getElementsByTagName is close, but it only works for a single tag
    // So for now, we'll need to crawl through and find all of the headers

    const headers: Parse5Node[] = findHeaders(document.childNodes[0] as Parse5Node);

    const nodes: ITreeNode[] = getRoots(headers);

    console.log(nodes);

    return nodes;
}

const headerTags = ["h1", "h2", "h3", "h4", "h5", "h6"]

/**
 * Recursively crawls through the DOM tree to find all headers
 * @param element 
 * @returns 
 */
function findHeaders(element: Parse5Node): Parse5Node[]
{
    let headers: Parse5Node[] = [];
    
    // Add the parent node if it's a header
    if (headerTags.includes(element.nodeName))
        headers.push(element);

    // Add the child nodes
    for (let child of element.childNodes ?? [])
    {
        headers = [...headers, ...findHeaders(child)];
    }

    return headers;
}

/**
 * Gets all of the root headers.
 * Note: root headers are not always h1 elements. they can be any element, as long as there is no preceding header with a lower depth. 
 * @param headers The list of headers to extract the roots from
 * @returns The list of roots
 */
function getRoots(headers: Parse5Node[]): ITreeNode[]
{
    let roots: ITreeNode[] = [];

    const remainingHeaders = headers.toReversed();

    while (remainingHeaders.length > 0)
    {
        roots.push(getNextNode(remainingHeaders));
    }

    return roots;
}

/**
 * Gets the next node from the header list, removing itself and it's children recursively from the list
 * Note: child nodes are considered to be all nodes with a depth greater than the parent node, up until the next parent node.
 * @param headers The list of remaining headers to be processed. Will be mutated.
 */
function getNextNode(headers: Parse5Node[]): ITreeNode
{
    const parent = headers.pop();

    if (parent == null)
        throw new Error("No Nodes Remaining!"); // This should never happen, something went very wrong!

    const depth = getHeaderDepth(parent);

    const children: ITreeNode[] = [];

    while (headers.length > 0)
    {
        let next = headers[headers.length - 1];

        if (getHeaderDepth(next) <= depth)
            break; // We found a node that is not a child! 

        children.push(getNextNode(headers));
    }

    return {
        text: getText(parent),
        url: "#" + getId(parent),

        children: children.length > 0 ? children : undefined,
    }
}

function getText(header: Parse5Node): string
{
    for (let child of header.childNodes ?? [])
    {
        if (child.nodeName == "#text")
            return child.value ?? "";
    }

    return "";
}

function getId(header: Parse5Node): string
{
    for (let attr of header.attrs ?? [])
    {
        if (attr.name == "id")
            return attr.value;
    }

    return "ERROR"
}

function getHeaderDepth(header: Parse5Node)
{
    return headerTags.indexOf(header.nodeName) + 1;
}