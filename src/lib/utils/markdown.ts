import YAML from 'yaml'
import { Marked } from 'marked';
import { gfmHeadingId } from 'marked-gfm-heading-id';
import { decodeDataURL } from './base64';
import markedAlert from 'marked-alert';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';
import markedmermaid from './markedmermaid';
import markedpreviews from './markedpreviews';
import { renderSvelte, type RenderedSMDComponent, type SMDComponent } from '$lib/utils/markdownsvelte';

const frontmatterRegex = /^---((?:\r|\n|.)*?)---/

type fetch = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

/**
 * Takes a URL and reads the markdown from that file. 
 * This exists because Vite will occasionally decide to turn urls into data urls, which break the fetch provided by Sveltekit
 * @param url 
 * @param ufetch 
 * @returns 
 */
export async function readMarkdown(url: string, ufetch: fetch): Promise<string>
{
    // Check to see if the url is base64
    if (url.startsWith("data:"))
    {
        return decodeDataURL(url) ?? "";
    }

    else
    {
        return (await ufetch(url)).text();
    }
}

/**
 * Takes a markdown string and converts it to HTML, while extracting the frontmatter
 * @param markdown 
 * @returns The HTML string, along with the frontmatter of the markdown, and a list of all of the svelte components in the markdown
 */
export async function parseMarkdown(markdown: string): Promise<[string, object, RenderedSMDComponent[]]>
{
    const marked = new Marked();

    let frontmatter = extractFrontmatter(markdown);

    // we need to remove the frontmatter to prevent issues when parsing the markdown
    markdown = removeFrontmatter(markdown);

    // convert the markdown into html

    let svelteComponents: RenderedSMDComponent[];

    [markdown, svelteComponents] = renderSvelte(markdown);

    // configure marked
    marked.use(gfmHeadingId()); // Add unique IDs to headers
    marked.use(markedAlert()); // Add GitHub markdown alerts
    
    marked.use(markedHighlight({
        emptyLangClass: 'hljs',
        langPrefix: 'hljs language-',
        highlight(code, lang, info) {
            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
            return hljs.highlight(code, { language }).value;
        }
    }))

    marked.use(markedmermaid);
    marked.use(markedpreviews);

    console.log("PRE PARSE\n------------------------------------------")
    console.log(markdown);

    let html = await marked.parse(markdown);

    console.log("POST PARSE\n------------------------------------------")
    console.log(html);

    // FIX ESCAPE CHARACTERS IN RAW HTML BLOCK
    const rawHTMLRegex = /<slot class="RAW-HTML">(?<rawhtml>.*?)<\/slot>/gs;
    
    html = html.replaceAll(rawHTMLRegex, htmlEntityReplacer);

    console.log("POST ENTITY FIX\n------------------------------------------")
    console.log(html);

    return [html, frontmatter, svelteComponents];
}

type ReplacerFunction = (substring: string, ...args: any[]) => string;

const htmlEntityReplacer: ReplacerFunction = (substring: string, ...args: any[]) => 
{
    // This is the first capture group
    let rawHTML = args[0] as string;

    // console.log("RAW HTML: ");
    // console.log(rawHTML);

    let fixed = rawHTML
        .replaceAll(/&lt;/g, "<")
        .replaceAll(/&gt;/g, ">")
        .replaceAll(/&quot;/g, "\"")
        ;
    
    return fixed;
}
 

/**
 * Converts the frontmatter of markdown into a JavaScript object
 * @param markdown The markdown to extract the frontmatter of
 * @returns The parsed frontmatter as an object
 */
export function extractFrontmatter(markdown: string): object
{
    //console.log(markdown);
    if (frontmatterRegex.test(markdown))
    {
        let matches = markdown.match(frontmatterRegex);

        let yaml = matches?.[1];

        if (yaml != null)
            return YAML.parse(yaml);

    }

    return {};
}

function removeFrontmatter(markdown: string): string
{
    return markdown.replace(frontmatterRegex, "");
}