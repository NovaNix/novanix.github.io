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
<div id="diagram">
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
    #diagram {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .raw-mermaid-diagram {
        white-space: pre-wrap;
        display: none;
    }
</style>

