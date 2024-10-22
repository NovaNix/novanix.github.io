import {render} from "svelte/server"

import MermaidDiagram from "$lib/components/MermaidDiagram.svelte"

interface Component 
{
    tag: string;

    attributes: Attribute[];

    contents: string;
} 

interface Attribute
{
    name: string;
    value?: any;
}

const elementMap = {
    "MermaidDiagram": MermaidDiagram
}

export function renderSvelte(markdown: string)
{

}

function renderComponents(markdown: string)
{

}

function findComponents(markdown: string)
{
    const startingTagRegex = /<(?<tag>(?:\w)+)\s*(?<attrs>.*?|\n*?)\/?>/g
    const endingTagRegex = /<\/(?<tag>(?:\w)+)>/g


}