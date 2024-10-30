<script lang=ts>
    import type { Snippet } from "svelte";

	interface Props {
		snippet: Snippet,
		value: string,
		tryEscaped?: boolean;
	}

	let {snippet, value = $bindable(), tryEscaped = false}: Props = $props();

	let hasRaw = $derived(Object.hasOwn(snippet, "asRaw"));

	let content: HTMLElement;

    //let raw = $state("");

    $effect(() => {
		snippet;
		hasRaw;

		let raw: string = "";

		console.log("Effect")

		if (hasRaw && tryEscaped)
		{
			// Handle cases when we pass a raw value in!
			raw = (snippet as any).asRaw();

			console.log(raw);

			raw = raw.replaceAll(/\r/g, ""); // Remove carriage return!!
			raw = raw.replace(/^\n/, ""); // Remove any newline characters that might be in front
			raw = raw.replace(/\n$/, ""); // Remove any trailing newlines
		}

		else
		{
			console.log("getting inner content")
			raw = content.innerHTML;

			// sometimes sveltekit likes to add <!----> to the end and start?
			// this should be looked into more closely later, but for now, imma just remove it
			raw = raw.replace(/^<!---->/, "");
			raw = raw.replace(/<!---->$/, "");
		}

		// Remove markdown container elements
		raw = raw.replace(/^<div class="svelte-mdc">\n\n\n(.*)\n\n<\/div>$/gs, "$1");

		value = raw;
	});

</script>

<div bind:this={content}>
	{#if hasRaw && tryEscaped}
	<!-- EMPTY -->
	{:else}
	{@render snippet()}
	{/if}
</div>



<style>
	div {
		display: none;
		white-space: pre-wrap;
	}
</style>