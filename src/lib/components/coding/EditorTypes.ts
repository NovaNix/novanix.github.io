interface EditorState
{
	// openTab: Language,
	tabs: Partial<Record<Language, EditorTab>>
}

interface EditorTab
{
	lang: Language,
	code: string
}

enum Language
{
	html = "html",
	css = "css"
}

enum EditorPreviewMode
{
	HTML = "html"
}