import { marked } from "marked";

const renderer = new marked.Renderer();

renderer.code = function ({ text, lang }) {

    if (lang == "raw-html")
    {
        return `\n\n<slot class="RAW-HTML">\n` + text + "\n</slot>\n\n";
    }

    if (lang == "mermaid")
    {
        return '<pre class="mermaid">' + text + '</pre>';
    }
    else 
    {
        return '<pre><code>' + text + '</code></pre>';
    }
};

export default {renderer};