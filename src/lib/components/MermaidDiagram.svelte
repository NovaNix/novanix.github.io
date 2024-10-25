<script module>
    import mermaid from "mermaid"

    mermaid.initialize({ startOnLoad: false });
</script>

<script lang="ts">
    import { type Snippet } from "svelte";

    interface Props {
        children: Snippet;
	}

    let { children }: Props = $props();

    let content: HTMLElement;

    let diagram = $state("");

    $effect(() => {
		diagram = content.innerText;
	});

</script>

<div bind:this={content} class="raw-mermaid-diagram">
    {@render children?.()}
</div>
<div>
    <!-- diagram: {diagram} -->
    {#await mermaid.render('graphDiv', diagram)}
	<!-- promise is pending -->
	<p>Loading Diagram...</p>
    {:then value}
    	<!-- promise was fulfilled or not a Promise -->
    	{@html value.svg}
    {:catch error}
    	<!-- promise was rejected -->
    	<p>Failed to load diagram!: {error.message}</p>
    {/await}
</div>

<style>
    div {
        white-space: pre-wrap;
    }

    .raw-mermaid-diagram {
        display: none;
    }
</style>

