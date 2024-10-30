/** 
 * A list of all HTML Elements.
 * Pulled from https://stackoverflow.com/questions/52928550/js-get-list-of-all-available-standard-html-tags
 */
export const HTMLElements = [
    "!DOCTYPE",
    "a",
    "abbr",
    "abbr",
    "acronym", // NOT HTML5
    "address",
    //"applet", // NOT HTML5 (NOT MAJORLY SUPPORTED)
    "area",
    "article",
    "aside",
    "audio",
    "b",
    "base",
    "basefont", // NOT HTML5
    "bdi",
    "bdo",
    "big", // NOT HTML5
    "blockquote",
    "body",
    "br",
    "button",
    "canvas",
    "caption",
    "center", // NOT HTML5
    "cite",
    "code",
    "col",
    "colgroup",
    "data",
    "datalist",
    "dd",
    "del",
    "details",
    "dfn",
    "dialog",
    //"dir", NOT HTML5 (use "ul" instead)
    "div",
    "dl",
    "dt",
    "em",
    "embed",
    "fieldset",
    "figcaption",
    "figure",
    //"font", // NOT HTML5 (use CSS)
    "footer",
    "form",
    //"frame", // NOT HTML5
    //"frameset", // NOT HTML5
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "head",
    "header",
    "hr",
    "html",
    "i",
    "iframe",
    "img",
    "input",
    "ins",
    "kbd",
    "label",
    "legend",
    "li",
    "link",
    "main",
    "map",
    "mark",
    "meta",
    "meter",
    "nav",
    //"noframes", // NOT HTML5
    "noscript",
    "object",
    "ol",
    "optgroup",
    "option",
    "output",
    "p",
    "param",
    "picture",
    "pre",
    "progress",
    "q",
    "rp",
    "rt",
    "ruby",
    "s",
    "samp",
    "script",
    "section",
    "select",
    "small",
    "source",
    "span",
    //"strike", NOT HTML5 (Use <del> or <s> instead)
    "strong",
    "style",
    "sub",
    "summary",
    "sup",
    "svg",
    "table",
    "tbody",
    "td",
    "template",
    "textarea",
    "tfoot",
    "th",
    "thead",
    "time",
    "title",
    "tr",
    "track",
    //"tt", // NOT HTML5 (Use CSS)
    "u",
    "ul",
    "var",
    "video",
    "wbr"
] // Total of 116 (excluding non-html5 and also comments, which are "<!-- [comment] -->").

const escapeMap = {
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;"
} as const;

export function escapeHTML(html: string)
{
    let fixed = html;

    for (let [char, entity] of Object.entries(escapeMap))
    {
        fixed = fixed.replaceAll(char, entity);
    }

    // let fixed = rawHTML
    // .replaceAll(/&lt;/g, "<")
    // .replaceAll(/&gt;/g, ">")
    // .replaceAll(/&quot;/g, "\"")
    // ;

    return fixed;
}
