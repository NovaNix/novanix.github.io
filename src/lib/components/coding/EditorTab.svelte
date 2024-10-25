<script lang="ts">
    import type { Snippet } from "svelte";


	interface Props {
		lang: Language
	}

	interface Props {
		children: Snippet,
		editable: boolean
	}

	let {children, editable = true}: Props = $props();

</script>

<code contenteditable={editable}>
	{@render children?.()}
</code>