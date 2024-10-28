<script lang=ts>
    import type { Snippet } from "svelte";

	interface Props {
		snippet: Snippet,
		value: string
	}

	let {snippet, value = $bindable()}: Props = $props();

	let content: HTMLElement;

    //let raw = $state("");

    $effect(() => {
		//raw = content.innerText;
		let raw = content.innerHTML;

		// sometimes sveltekit likes to add <!----> to the end?
		// this should be looked into more closely later, but for now, imma just remove it
		raw = raw.replace(/<!---->$/, "");

		value = raw;
	});

</script>

<div bind:this={content}>{@render snippet()}</div>

<style>
	div {
		display: none;
		white-space: pre-wrap;
	}
</style>