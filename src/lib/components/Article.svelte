<script lang="ts">
    import type { ITreeNode } from "$lib/types/treetypes";
    import Tree from "./tree/Tree.svelte";

	export let title: string;
	export let toc: ITreeNode[] | null = null;

</script>

<article>
	<header>
		<h1>{title}</h1>
		<div id="links">
			<slot name="links"></slot>
		</div>
	</header>
	
	<slot></slot>
</article>

<aside>
	{#if toc}
	<Tree roots={toc}/>
	{/if}
</aside>

<style>
	article {
		max-width: 1012px;
    	margin-left: auto;
    	margin-right: auto;

    	background-color: var(--background-color);
	}
</style>