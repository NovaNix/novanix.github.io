interface EditorState
{
	openTab: Language,

	tabs: EditorTab[]
}

interface EditorTab
{
	hidden: boolean;

	code: string;
}

enum Language
{
	"html",
	"css"
}

enum EditorPreviewMode
{
	HTML
}