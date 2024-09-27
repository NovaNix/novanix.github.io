<script lang="ts">
    import type { ITreeNode } from "$lib/types/treetypes";
    import Tree from "./tree/Tree.svelte";

	export let title: string;
	export let toc: ITreeNode[] | null = null;

</script>

<main>
	<article>
		<hgroup>
			<h1>{title}</h1>
			<div id="links">
				<slot name="links"></slot>
			</div>
		</hgroup>
		
		<slot></slot>
	</article>
	
	<aside>
		<h1>Table of Contents</h1>
		{#if toc}
		<Tree roots={toc}/>
		{/if}
	</aside>
</main>


<style>

	main {
		display: flex;
		flex-direction: row;

		justify-content: center;
		align-items: flex-start;

		gap: 10px;
	}

	article {
		max-width: 1012px;
    	/* margin-left: auto;
    	margin-right: auto; */

    	background-color: var(--background-color);
	}

	aside {
		background-color: var(--background-color);
	}

</style>