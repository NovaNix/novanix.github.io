<script lang="ts">
    import type { ITreeNode } from "$lib/types/treetypes";
    import type { LabeledLink } from "$lib/types/types";
    import Breadcrumb from "./Breadcrumb.svelte";
    import PrevNextBar from "./PrevNextBar.svelte";
    import Tree from "./tree/Tree.svelte";

	export let title: string;
	export let icon: string | null = null;

	export let sideTreeTitle: string | null = null;
	export let sideTree: ITreeNode[] | null = null;

	export let prev: LabeledLink | null = null;
	export let next: LabeledLink | null = null;

	export let crumbs: LabeledLink[] | null = null;

	export let toc: ITreeNode[] | null = null;

</script>

<main>

	<div id="article-body">
		{#if crumbs}
			<Breadcrumb {crumbs}/>
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

			<footer>
				
				{#if prev || next}
					<hr/>
					<PrevNextBar {prev} {next}/>
				{/if}
			</footer>
		</article>
	</div>
	
	<div id="page-nav">

		{#if sideTree && sideTree.length > 0}
		<aside class="nav-tree">
			<!-- <h1>{sideTreeTitle}</h1> -->
			<Tree roots={sideTree}/>
			{#if prev || next}
				<hr/>
				<PrevNextBar {prev} {next} shrunk/>
			{/if}
		</aside>
		{/if}

		{#if toc && toc.length > 0}
		<aside class="toc">
			<h1>Table of Contents</h1>
			<Tree roots={toc}/>
		</aside>
		{/if}
	</div>
	
	
</main>


<style lang="scss">

	$max-size: 1012px;

	main {
		/* display: flex;
		flex-direction: row;

		justify-content: center;
		align-items: flex-start;

		gap: 10px; */
		display: grid; 
		gap: 10px 10px; 

		padding: 20px;

		position: relative; /* For sticky */

		justify-content: stretch;
		/* justify-content: center;  */
	}

	/* Mobile Layout */

	@media screen {
		
		main {
			grid-template-columns: 100%; 
  			grid-template-rows: 1fr; 
  			grid-template-areas: 
  			  "content"; 
		}
		
		/* Hide the sidebars */
		/* TODO: add buttons you can click to have them show up */

		#page-nav {
			display: none;
		}

		/* .nav-tree {
			display: none;
		}

		.toc {
			display: none;
		} */
	}

	/* Compact Layout */

	@media screen and (min-width: 50rem) {
		main {
			/* grid-template-columns: min-content 1fr; 
  			grid-template-rows: min-content min-content; 
  			grid-template-areas: 
    		"toc content"
    		"nav-tree content";  */

			grid-template-columns: auto 1fr; 
  			grid-template-rows: min-content; 
  			/* gap: 0px 0px;  */
  			grid-template-areas: 
  			  "sidebar content"; 
		}

		#page-nav {
			position: sticky;
			top: 10px;

			height: fit-content;
			max-height: calc(100vh - 20px);

			overflow: auto;
			scrollbar-width: thin;
			

			display: grid; 
  			grid-template-columns: 1fr; 
  			grid-template-rows: min-content; 
  			gap: 0px 0px; 
  			grid-template-areas: 
    			"toc"
    			"nav-tree"; 
  			grid-area: sidebar; 

			justify-self: end;
		}

		/* .nav-tree {
			display: block;
		}

		.toc {
			display: block;
		} */
	}

	/* Fullsize Layout */

	@media screen and (min-width: 70rem) {
		main {
			
  			grid-template-columns: auto minmax(auto, $max-size) auto; 
  			grid-template-rows: 1fr; 
  			

  			grid-template-areas: 
    		"nav-tree content toc"; 
		}

		#page-nav {
			display: contents;
		}

		.nav-tree, .toc {
			display: block;
			position: sticky;

			top: 10px;
			width: max-content;
		}

		.nav-tree {
			justify-self: end;
		}

		.toc {
			justify-self: start;
		}

	}

	#article-body {
		width: 100%; /* TODO CHANGE LATER */
		max-width: $max-size;

		grid-area: content;

		overflow-x: auto;
	}

	article {
		
    	/* margin-left: auto;
    	margin-right: auto; */

    	background-color: var(--background-color);
		padding: 20px;

		width: 100%;
		// min-width: fit-content;

		box-sizing: border-box;

		overflow-x: auto;
	}

	.nav-tree {
		grid-area: nav-tree;
	}

	.toc {
		grid-area: toc;
	}

	aside {
		background-color: var(--background-color);
		padding: 20px;

		/* width: max-content; */
		height: fit-content;
	}

	img {
		height: 150px;
	}

	hgroup {
		display: flex;

		padding: 10px;

		border-bottom: 1px solid var(--divider-color);
		
	}

	hr {
		border: 0;
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