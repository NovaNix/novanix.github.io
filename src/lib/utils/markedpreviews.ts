const htmlRegex = /```html preview\r?\n((?:.|\n|\r)*?)```/gm

const replacementText = "```html\n$1\n```\n<label>\nResult:\n<output class=\"html-preview\">\n$1\n</output>\n</label>"

function preprocess(markdown: string)
{
    const replaced = markdown.replaceAll(htmlRegex, replacementText);

    return replaced;
}

export default { hooks: { preprocess } };