<script module>
	import hljs from 'highlight.js';
</script>

<script lang="ts">
   
	import { getContext, type Snippet } from "svelte";
    import SnippetExtractor from "../utils/SnippetExtractor.svelte";

	interface Props {
		children: Snippet,
		editable: boolean,
		hidden: boolean

		lang: Language
	}

	let {children, editable = false, lang, hidden = false}: Props = $props();

	let code = $state("")
	let highlighted = $state("")

	let editor = getContext('code-editor') as EditorState
	
	$effect(() => {
		if (editor.tabs == null)
			editor.tabs = {}

		if (editor.tabs[lang] == null)
			editor.tabs[lang] = {
					lang,
					code
				}

		editor.tabs[lang].code = code;

		// Highlight the code

		highlighted = hljs.highlight(code, {language: lang}).value
	})

</script>

<SnippetExtractor bind:value={code} snippet={children} tryEscaped/>

{#if !hidden}
<pre><code contenteditable={editable} class="hljs">{@html highlighted}</code></pre>
{/if}