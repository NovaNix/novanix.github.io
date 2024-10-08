<script lang="ts">
    import type { ITreeNode } from "$lib/types/treetypes";
    import Tree from "./tree/Tree.svelte";

	export let title: string;
	export let icon: string | null = null;

	export let sideTreeTitle: string | null = null;
	export let sideTree: ITreeNode[] | null = null;

	export let toc: ITreeNode[] | null = null;

</script>

<main>

	{#if sideTree && sideTree.length > 0}
	<aside>
		<h1>{sideTreeTitle}</h1>
		<Tree roots={sideTree}/>
	</aside>
	{/if}

	<article>
		<hgroup>
			<!-- svelte-ignore a11y-missing-attribute -->
			{#if icon}<img src={icon}/>{/if}
			<div id="header-text">
				<h1>{title}</h1>
				<div id="links">
					<slot name="links"></slot>
				</div>
			</div>
		</hgroup>
		
		<slot></slot>
	</article>
	
	{#if toc && toc.length > 0}
	<aside>
		<h1>Table of Contents</h1>
		<Tree roots={toc}/>
	</aside>
	{/if}
</main>


<style>

	main {
		display: flex;
		flex-direction: row;

		justify-content: center;
		align-items: flex-start;

		gap: 10px;

		padding: 20px;

		position: relative; /* For sticky */
	}

	article {
		width: 100%; /* TODO CHANGE LATER */
		max-width: 1012px;
    	/* margin-left: auto;
    	margin-right: auto; */

    	background-color: var(--background-color);
		padding: 20px;
	}

	aside {
		background-color: var(--background-color);
		padding: 20px;

		width: max-content;

		position: sticky;
		top: 0px;
	}

	img {
		height: 150px;
	}

	hgroup {
		display: flex;

		padding: 10px;

		border-bottom: 1px solid var(--divider-color);
		
	}

	#header-text {
		display: flex;
		flex-direction: column;
		margin-left: 20px;
	}

	#header-text h1 {
		font-size: 2.5rem;
	}

	h1 {
		width: max-content;
		margin: 0;
	}

</style>