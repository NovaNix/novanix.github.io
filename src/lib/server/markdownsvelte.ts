import {render} from "svelte/server"

import MermaidDiagram from "$lib/components/MermaidDiagram.svelte"

//MermaidDiagram.

type MarkdownBlock = Component | string;

interface Component 
{
    //tag: string;
    tag: ElementName

    attributes: Attribute[];

    contents?: string;
} 

enum TagType {
    Start = "Start", 
    End = "End", 
    SelfContained = "SelfContained"
}

interface Tag {
    raw: string;

    name: ElementName;
    // name: string;
    type: TagType;

    attrs: string;

    pair?: Tag;

    indices: [number, number];

    contents?: string;

    depth: number;
}

interface Attribute
{
    name: string;
    value?: any;
}

const elementMap = {
    "MermaidDiagram": MermaidDiagram
} as const;

const elementNames = Object.keys(elementMap);

type ElementName = keyof typeof elementMap;

export function renderSvelte(markdown: string): string
{
    return renderMarkdown(markdown, true);
}

export function renderMarkdown(markdown: string, isRoot: boolean): string
{
    let html = "";

    const blocks = findBlocks(markdown);

    for (let block of blocks)
    {
        if (typeof block == "string")
        {
            html += block;
        }

        else
        {
            if (isRoot)
                html += "```raw-html\n"
            html += renderComponent(block);
            if (isRoot)
                html += "\n```"
        }

    }

    return html;
}

function renderComponent(component: Component): string
{
    // let html = `<h1>${component.tag}</h1>\n`;

    let svelteComponent = elementMap[component.tag];

    let contents: string; 

    if (component.contents)
        contents = renderMarkdown(component.contents, false);

    // Convert the component to HTML
    let output = render(svelteComponent, {
        props: {}
    })

    return output.body;
}

/**
 * Finds all of the top level components in the markdown, along with text blocks associated with them
 * @param markdown 
 */
function findBlocks(markdown: string): MarkdownBlock[]
{
    // Get all of the tags that are not contained within other tags
    let tags = getTags(markdown).filter(value => value.depth == 0);

    tags = tags.filter(tag => tag.type != TagType.End);

    let blocks: MarkdownBlock[] = [];
    
    // The index of the last character of the last processed tag
    let prevIndex = 0;

    for (let tag of tags)
    {
        console.log("Processing tag")
        console.log(tag);

        let startTag = tag;
        let endTag = startTag.pair ?? startTag;

        // Add the text before the element 

        let blockStart = startTag.indices[0]; // The start index of the starting tag
        let blockEnd = endTag.indices[1]; // The end index of the ending tag

        blocks.push(markdown.slice(prevIndex, blockStart));
        prevIndex = blockEnd; 

        // Add the component to the blocks

        let component: Component = {
            tag: startTag.name,
            attributes: parseAttributes(startTag.attrs),
            contents: startTag.contents
        }

        blocks.push(component);

    }

    // Add the text after the components
    blocks.push(markdown.slice(prevIndex));

    for (let block of blocks)
    {
        console.log("Found block!");
        console.log(block);
    }

    return blocks.filter(block => {
        // Remove all zero length strings
        if (typeof block == "string")
            return block.length > 0;

        return true;
    });
}

function getTags(markdown: string): Tag[]
{
    const tagRegex = /(?<raw><\/?(?<tag>(?:\w|\d|-)+)\s*(?<attrs>.*?)\/?>)/gsd

    const startRegex = /<((?:\w|\d|-)+)\s*(?<attrs>.*?)[^\/]+>/
    const endRegex = /<\/((?:\w|\d|-)+)\s*(?<attrs>.*?)>/

    let tags: Tag[] = [];

    let depth = 0;

    for (let match of markdown.matchAll(tagRegex))
    {
        //console.log("Found match!");
        //console.log(match);

        if (match.groups == null)
            continue;

        let raw = match.groups["raw"] ?? "";
        let name = match.groups["tag"] ?? "";
        let attrs = match.groups["attrs"] ?? "";

        if (!elementNames.includes(name))
            continue; // This element is not supported!

        let indices = match?.indices?.[0];

        let type: TagType;

        if (startRegex.test(raw))
            type = TagType.Start;
        else if (endRegex.test(raw))
            type = TagType.End
        else
            type = TagType.SelfContained;

        if (type == TagType.End)
            depth--;

        let tag: Tag = {
            raw, 
            name: name as ElementName,
            type,
            attrs,
            indices: indices ?? [-1, -1],
            depth
        }

        if (type == TagType.Start)
            depth++;

        // Attach the tag to it's partner 

        if (tag.type == TagType.End)
        {
            for (let other of tags.toReversed())
            {
                if (other.type != TagType.Start)
                    continue; // Tag must be a start tag
                if (other.name != name)
                    continue; // Tags must share the same name
                if (other.pair != null)
                    continue; // Tag must not already have a pair

                // We found it's pair! we can stop looking
                other.pair = tag;
                tag.pair = other;

                let contentStart = other.indices[1];
                let contentEnd = tag.indices[0];

                other.contents = markdown.slice(contentStart, contentEnd);

                break;
            }
        }

        tags.push(tag);
    }

    for (let tag of tags)
    {
       //console.log("Found tag");
        //console.log(tag);
    }

    // markdown.matchAll(tagRegex)?.forEach((value) => {
    //     console.log("Found match!")
    //     console.log(value);
    //     //value.
    // });

    return tags;
}

function parseAttributes(attrs: string): Attribute[]
{
    return [];
}