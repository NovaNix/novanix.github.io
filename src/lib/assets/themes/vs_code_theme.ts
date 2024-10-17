
export interface VSCodeTheme
{
    colors: {[key: string]: string},
    tokenColors: [TokenTheme]
}

export interface TokenTheme
{
    scope: string | [string];
    settings: {[key: string]: string};
    name?: string;
}

const highlightTokens = [
    // General purpose

    "keyword", //keyword in a regular Algol-style language
    "built_in", //built-in or library object (constant, class, function)
    "type", //data type (in a language with syntactically significant types) (string, int, array, etc.)
    "literal", //special identifier for a built-in value (true, false, null, etc.)
    "number", //number, including units and modifiers, if any.
    "operator", //operators: +, -, >>, |, ==
    "punctuation", //aux. punctuation that should be subtly highlighted (parentheses, brackets, etc.)
    "property", //object property obj.prop1.prop2.value
    "regexp", //literal regular expression
    "string", //literal string, character
    "char.escape", //an escape character such as \n
    "subst", //parsed section inside a literal string
    "symbol", //symbolic constant, interned string, goto label
    //"class", //deprecated You probably want title.class
    //"function", //deprecated You probably want title.function
    "variable", //variables
    "variable.language", //variable with special meaning in a language, e.g.: this, window, super, self, etc.
    "variable.constant", //variable that is a constant value, ie MAX_FILES
    "title", //name of a class or a function
    "title.class", //name of a class (interface, trait, module, etc)
    "title.class.inherited", //name of class being inherited from, extended, etc.
    "title.function", //name of a function
    "title.function.invoke", //name of a function (when being invoked)
    "params", //block of function arguments (parameters) at the place of declaration
    "comment", //comments
    "doctag", //documentation markup within comments, e.g. @params

    // Meta

    "meta", //flags, modifiers, annotations, processing instructions, preprocessor directives, etc
    "meta.prompt", //REPL or shell prompts or similar
    "meta keyword", //a keyword inside a meta block (note this is nested, not subscoped)
    "meta string", //a string inside a meta block (note this is nested, not subscoped)

    // Tags, attributes, configs

    "section", //heading of a section in a config file, heading in text markup
    "tag", //XML/HTML tag
    "name", //name of an XML tag, the first word in an s-expression
    "attr", //name of an attribute with no language defined semantics (keys in JSON, setting names in .ini), also sub-attribute within another highlighted object, like XML tag
    "attribute", //name of an attribute followed by a structured value part, like CSS properties

    // Text Markup

    "bullet", //list item bullet
    "code", //code block
    "emphasis", //emphasis
    "strong", //strong emphasis
    "formula", //mathematical formula
    "link", //hyperlink
    "quote", //quotation or blockquote

    // CSS

    "selector-tag", //tag selector
    "selector-id", //#id selector
    "selector-class", //.class selector
    "selector-attr", //[attr] selector
    "selector-pseudo", //:pseudo selector

    // Templates

    "template-tag", //tag of a template language
    "template-variable", //variable in a template language

    // diff

    "addition", //added or changed line
    "deletion", //deleted line
] as const;

/** A map that converts vscode tokens to highlight.js tokens */
type TokenMap = {[key: string]: typeof highlightTokens[number]}
const tokenMap: TokenMap = {
    "meta.preprocessor": "meta",
    //"entity.name.tag.css": "",
    "comment": "comment",
    //"constant.language": "",
    "variable": "variable",
    "variable.other.constant": "variable.constant",

    "constant.character.escape": "char.escape"
}

export function convertTheme(theme: VSCodeTheme)
{

} 