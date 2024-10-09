<script lang="ts">
    import type { LabeledLink } from "$lib/types/types";

	export let crumbs: LabeledLink[];
</script>

<div>
	{#each crumbs as crumb, index}
		{#if index > 0}<span>/</span>{/if}
		<a href={crumb.url}>{crumb.name}</a>
	{/each}
</div>

<style>
	div {
		width: 100%;

		background-color: var(--background-color);
		padding: 10px;

		display: flex;

		margin-bottom: 10px;

		box-sizing: border-box;
	}

	span {
		padding-left: 5px;
		padding-right: 5px;
	}
</style>