<script module>
	
</script>

<script lang="ts">
	import { setContext, type Snippet } from 'svelte';
    import HTMLCSSPreview from './previews/HTMLCSSPreview.svelte';

	interface Props {
		children: Snippet,
		preview: EditorPreviewMode
	}

	let {children, preview}: Props = $props();

	let editor: EditorState = $state({
		tabs: {},
		
	})

	setContext('code-editor', editor);
</script>

<section>
	<div>
		{@render children?.()}
	</div>
	Result:
	<output>
		{#if preview == "html"}<HTMLCSSPreview/>{/if}
	</output>
</section>

<style>
	section {
		/* border: 2px solid black; */
		margin-block-start: 1em;
  		margin-block-end: 1em;
	}

	output {
		display: block;
		width: 100%;

		height: min-content;

		border-width: 1px;
        border-color: var(--border-color);
        border-style: solid;

        padding: 0px 10px;

        width: 100%;
        display: block;

        box-sizing: border-box;

        overflow: auto;
	}
</style>