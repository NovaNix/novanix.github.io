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

	let tab = $derived({
		lang,
		code
	})

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
	})

</script>

<SnippetExtractor bind:value={code} snippet={children}/>

{#if !hidden}
<pre><code contenteditable={editable}>{code}</code></pre>
{/if}