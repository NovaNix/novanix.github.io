import {render} from "svelte/server"
import { v4 as uuidv4 } from "uuid"

import MermaidDiagram from "$lib/components/MermaidDiagram.svelte"
import { createRawSnippet, type Snippet } from "svelte";

export type SMDBlock = SMDComponent | string;

export interface SMDComponent 
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

export interface Attribute
{
    name: string;
    value: any;
}

const elementMap = {
    "MermaidDiagram": MermaidDiagram
} as const;

export function getComponent(name: ElementName)
{
    return elementMap[name];
}

const elementNames = Object.keys(elementMap);

type ElementName = keyof typeof elementMap;
type ImportedComponents = (typeof elementMap)[ElementName] ;

export interface RenderedSMDComponent
{
    id: string;
    
    name: ElementName;

    props: Record<string, any>;
}

export function renderSvelte(markdown: string): [string, RenderedSMDComponent[]]
{
    return renderMarkdown(markdown, true);
}

export function renderMarkdown(markdown: string, isRoot: boolean): [string, RenderedSMDComponent[]]
{
    let html = "";

    const blocks = findBlocks(markdown);

    let components: RenderedSMDComponent[] = [];

    for (let block of blocks)
    {
        if (typeof block == "string")
        {
            html += block;
        }

        else
        {
            let [renderedHTML, renderedComponent] = renderComponent(block);

            if (isRoot)
                html += "```raw-html\n"
            html += renderedHTML;
            if (isRoot)
                html += "\n```"

            components.push(renderedComponent);
        }

    }

    return [html, components];
}

function renderComponent(component: SMDComponent): [string, RenderedSMDComponent]
{
    // let html = `<h1>${component.tag}</h1>\n`;

    let svelteComponent = elementMap[component.tag];

    //let childComponents: 
    let contents: string | undefined; 

    if (component.contents)
        [contents] = renderMarkdown(component.contents, false);

    let attrProps: Record<string, any> = {};

    for (let attribute of component.attributes)
    {
        attrProps[attribute.name] = attribute.value;
    }

    let childrenSnippet: Snippet | undefined;

    if (contents)
    {
        childrenSnippet = createRawSnippet(() => {
            return {
                render: (): string =>
                {
                    return contents;
                },
        
                setup: (node) =>
                {
                    // Hydrate the children
                }
            }
            
        })
    }
        
    // Convert the component to HTML
    let output = render(svelteComponent, {
        props: {
            // children: contents,
            children: childrenSnippet,
            ...attrProps
        }
    })

    const id = "sv-" + uuidv4();

    let renderedComponent: RenderedSMDComponent = {
        id,
        name: component.tag,
        props: {
            
            ...attrProps
        },



    }

    let rendered = `<div class="svelte-mdc" id="${id}">${output.body}</div>`

    return [rendered, renderedComponent];
}

/**
 * Finds all of the top level components in the markdown, along with text blocks associated with them
 * @param markdown 
 */
function findBlocks(markdown: string): SMDBlock[]
{
    // Get all of the tags that are not contained within other tags
    let tags = getTags(markdown).filter(value => value.depth == 0);

    tags = tags.filter(tag => tag.type != TagType.End);

    let blocks: SMDBlock[] = [];
    
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

        let component: SMDComponent = {
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
    // This regex has three named groups:
    // name: the name of the attribute
    // value?: the value of the attribute 
    // sveltelike?: the value of an attribute written in a sveltelike syntax (attr={value}). Includes the curly braces
    // sveltelikevalue?: the value of a sveltelike attribute without the braces
    // fallbackvalue?: the value of an attribute when not using string or sveltelike syntax
    // stringcontents?: if the value is a string, the contents of the string (all values should be strings, however if the syntax is invalid they might not be)
    //
    // NOTE: this regex *does* work with strings inside of strings (using escaped characters), 
    // but escaped characters are NOT automatically converted
    // Also, sveltelike syntax does not support strings (it'd make the regex even messier than it already is...). Use the string syntax for now
    const attributeRegex = /(?<name>(?:\w|\d|-)+)(?:\s*=\s*(?<value>(?<sveltelike>\{(?<sveltelikevalue>(?:\w|\d)+)\})|(?<fallbackvalue>(?:\w|\d)+)|(?:(?<!\\)"(?<stringcontents>.*?)(?<!\\)")))?/g
    // const attributeRegex = /(?<name>(?:\w|\d|-)+)(?:\s*=\s*(?<value>(?:\w+|\d+)|(?:(?<!\\)"(?<stringcontents>.*?)(?<!\\)")))?/g

    const attributes: Attribute[] = [];

    for (let match of attrs.matchAll(attributeRegex))
    {
        if (match.groups == null)
            continue;

        const name = match.groups["name"];
        const rawvalue = match.groups["value"];
        //let str = match.groups["stringcontents"];

        let value: any;

        if (rawvalue != null)
        {
            // The attribute has a value!

            let fallback = match.groups["fallbackvalue"];
            let str = match.groups["stringcontents"];
            let sveltelike = match.groups["sveltelikevalue"];

            if (fallback != null)
            {
                // The syntax is invalid? Log it to the console and continue

                console.warn(`Found invalid attribute! ${match[0]}`)
                console.warn(`Invalid syntax`)
                console.warn(`Make sure you're using the string syntax (attr="value") or the Svelte-Like syntax (attr={value})!`)

                continue;
            }

            else if (str != null)
            {
                // The value is a string!

                // Replace all escaped characters
                str = str.replaceAll(/\/"/g, `"`); // Fix escaped quotes
                str = str.replaceAll(/\/n/g, "\n"); // Fix escaped newlines

                value = str;
            }

            else if (sveltelike != null)
            {
                // The value is sveltelike! 

                if (sveltelike == "true")
                    value = true;
                else if (sveltelike == "false")
                    value = false;

                else if (!Number.isNaN(Number(sveltelike)))
                    value = Number(sveltelike);

                else {
                    // We're kinda out of types it can be that we can reasonably parse

                    console.warn(`Found invalid attribute! ${match[0]}`)
                    console.warn(`Error parsing sveltelike type. Is not a boolean or a number!`);

                    continue;
                }
            }

            else
            {
                console.warn(`Found invalid attribute! ${match[0]}`)
                console.warn(`Error parsing regex. String value, SvelteLike value, and fallback all null!`);

                continue;
            }
        }

        else
        {
            // The attribute was given no value. Default to true
            value = true;
        }

        // Add the parsed attribute to the list

        attributes.push({
            name,
            value
        })
    }

    return attributes;
}