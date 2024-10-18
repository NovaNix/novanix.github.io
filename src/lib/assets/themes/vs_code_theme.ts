// I'm writing this because I doubt I'm going to remember how all of this works 
//
// This file is responsible for taking the visual studio code themes (which are based on TextMate)
// and converts them into CSS classes to use with highlight.js.  
//
// Visual studio code's highlighting works by tokenizing the file, then having different selectors for each token
// Most of the token selectors have been mapped to the highlight.js tokens, but I'm sure I missed some.
// Not all tokens can be mapped unfortunately, as highlight.js doesn't label as many tokens as visual studio code does
// 
// To find which selectors visual studio code uses, go into it and run the "Developer: Inspect Editor Tokens and Scope" command
// Click on a token and the TextMate scopes will come up (along with which selector is currently used for the current color)
//
// This class can still be heavily improved. It can be cleaned up, the mapping can be made more flexible,
// more mappings can be added, etc. However I'm tired of dealing with this so I'm letting it be for now.
// Functionality-wise, custom css rules could be used to change the colors of certain words such as "new" or "delete",
// and language specific customizations can be added too. 
//
// Additional Resources
// https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide
// https://macromates.com/manual/en/language_grammars

export interface VSCodeTheme
{
    colors?: {[key: string]: string},
    tokenColors?: TokenTheme[]
}

export interface TokenTheme
{
    scope: string | string[];
    settings: {[key: string]: string | undefined};
    name?: string;
}

/** List of all of the highlight.js classes */ 
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
    //"title.class", //name of a class (interface, trait, module, etc)
    "title.class_", //name of a class (interface, trait, module, etc)
    "title.class.inherited", //name of class being inherited from, extended, etc.
    "title.function_", //name of a function
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
    // NOTE: all of the ones with comments after them are one's im not sure are properly mapped. 

    "keyword": "keyword",
    "keyword.control": "keyword",
    "support.function": "built_in",
    "support.class": "built_in", // built_in
    "support.constant": "built_in",
    "storage.type": "type",
    "entity.name.type": "type",
    "constant.language": "literal",
    "constant.numeric": "number",
    "keyword.operator": "operator",
    // punctuation
    // property
    "string.regexp": "regexp", // regexp
    "string": "string", // string
    "constant.character.escape": "char.escape",
    "string.interpolated": "subst", // subst
    // symbol
    "variable": "variable",
    "entity.name.variable": "variable",
    "variable.language": "variable.language", // variable.language
    "variable.other.constant": "variable.constant",
    // title
    //"entity.name.class": "title.class", // title.class
    "entity.name.class": "title.class_", // title.class
    "entity.other.inherited-class": "title.class.inherited", // title.class.inherited
    "entity.name.function": "title.function_", // title.function
    // title.function.invoke
    "variable.parameter": "params", // params
    "comment": "comment",
    "comment.line": "comment",
    "comment.block": "comment",
    "comment.block.documentation": "doctag",

    "meta.preprocessor": "meta",
    // meta.prompt
    // meta keyword
    "meta.preprocessor.string": "meta string", // meta string

    // section
    // tag
    "entity.name.tag": "name",
    "entity.other.attribute-name": "attr",
    "support.type.property-name": "attribute",

    // Markup

    // bullet
    // code
    "markup.italic": "emphasis",
    "emphasis": "emphasis",
    "markup.bold": "strong",
    "strong": "strong",
    // formula
    "markup.underline": "link",
    "markup.underline.link": "link",
    // quote

    //"markup.heading": ""
    // "markup.strikethrough"

    "entity.name.tag.css": "selector-tag", // selector-tag
    "entity.other.attribute-name.id.css": "selector-id", // selector-id
    "entity.other.attribute-name.class.css": "selector-class", // selector-class
    // selector-attr
    "source.css entity.other.attribute-name.pseudo-class": "selector-pseudo", // selector-pseudo

    // template-tag
    // template-variable

    // addition
    // deletion

    //"punctuation.definition.tag": 
}

export interface RuleSet
{
    selector: string,
    rules: Rule[]
}

export interface Rule
{
    prop: string,
    value: string
}

export function convertTheme(theme: VSCodeTheme): RuleSet[]
{
    let sets: {[key: string]: RuleSet} = {};

    // Note: the index name is just here to prevent it from being overridden
    sets["GLOBAL-CODE"] = {
        selector: "code.hljs",
        rules: []
    }

    // Add the non-token theming
    for (let [key, value] of Object.entries(theme.colors ?? {}))
    {
        if (key == "editor.background")
        {
            sets["GLOBAL-CODE"].rules.push({prop: "background-color", value});
        }
        else if (key == "editor.foreground")
        {
            sets["GLOBAL-CODE"].rules.push({prop: "color", value});
        }
        
    }

    //console.log("Loading tokens...");

    // Add the theming for each token
    for (let token of theme.tokenColors ?? [])
    {
        let scopeList: string[];

        if (typeof token.scope == "string")
            scopeList = [token.scope];
        else
            scopeList = token.scope;

        for (let scope of scopeList)
        {
            //console.log("Found scope: " + scope)

            if (tokenMap[scope] != null)
            {
                // This token's scope applies to a highlight.js token
                let hlToken = tokenMap[scope];

                if (sets[hlToken] == null)
                    sets[hlToken] = {selector: ".hljs-" + hlToken, rules: []}

                sets[hlToken].rules.push(...settingsToRule(token.settings));
            }

            else
            {
                // Use this to find some scopes that arent currently being processed
                //console.log("Unused scope: " + scope);
            }
        }
    }

    // TODO: add semantic token processing

    return Object.values(sets);
} 

/** Converts a settings object into a list of CSS rules */
function settingsToRule(settings: TokenTheme["settings"]): Rule[]
{
    let rules: Rule[] = [];

    for (let [setting, value] of Object.entries(settings))
    {
        if (setting == "foreground")
        {
            rules.push({
                prop: "color",
                value: value ?? ""
            });
        }

        else if (setting == "fontStyle")
        {
            // fontStyle is used for italics, bold, and strikethrough. 
            // these are all separate css properties, so we need to split them up
            switch (value)
            {
                case "italic":
                    rules.push({prop: "font-style", value: "italic"})
                    break;
                case "bold":
                    rules.push({prop: "font-weight", value: "bold"})
                    break;
                case "strikethrough":
                    rules.push({prop: "text-decoration", value: "line-through"})
                    break;
                
            }
        }
    }

    return rules;
}

export function mergeTheme(a: VSCodeTheme, b: VSCodeTheme): VSCodeTheme
{
    return {
        colors: {...a.colors, ...b.colors},
        tokenColors: [...a.tokenColors ?? [], ...b.tokenColors ?? []]
    }
}