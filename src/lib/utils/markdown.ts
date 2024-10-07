import YAML from 'yaml'
import { marked } from 'marked';
import { gfmHeadingId } from 'marked-gfm-heading-id';

const frontmatterRegex = /^---((?:\r|\n|.)*?)---/
//const frontmatterRegex = /^---((?:\n|.)*?)---/

export async function parseMarkdown(markdown: string): Promise<[string, object]>
{
    let frontmatter = extractFrontmatter(markdown);

    // we need to remove the frontmatter to prevent issues when parsing the markdown
    markdown = removeFrontmatter(markdown);

    // convert the markdown into html
    
    // configure marked
    marked.use(gfmHeadingId()); // Add unique IDs to headers

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
    console.log(markdown);
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