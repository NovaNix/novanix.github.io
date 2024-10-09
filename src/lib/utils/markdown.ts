import YAML from 'yaml'
import { marked } from 'marked';
import { gfmHeadingId } from 'marked-gfm-heading-id';
import { decodeDataURL } from './base64';
import markedAlert from 'marked-alert';

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
 * @returns The HTML string, along with the frontmatter of the markdown 
 */
export async function parseMarkdown(markdown: string): Promise<[string, object]>
{
    let frontmatter = extractFrontmatter(markdown);

    // we need to remove the frontmatter to prevent issues when parsing the markdown
    markdown = removeFrontmatter(markdown);

    // convert the markdown into html
    
    // configure marked
    marked.use(gfmHeadingId()); // Add unique IDs to headers
    marked.use(markedAlert()); // Add GitHub markdown alerts

    let html = await marked.parse(markdown);

    return [html, frontmatter];
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