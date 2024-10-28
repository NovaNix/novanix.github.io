<script lang="ts">
    import type { Snippet } from "svelte";
    import SnippetExtractor from "../utils/SnippetExtractor.svelte";


	interface Props {
		lang: Language
	}

	interface Props {
		children: Snippet,
		editable: boolean
	}

	let {children, editable = false}: Props = $props();

	let code = $state("");

</script>

<SnippetExtractor bind:value={code} snippet={children}/>

<pre><code contenteditable={editable}>{code}</code></pre>