<script lang="ts">
    import type { LabeledLink } from "$lib/types/types";

	export let crumbs: LabeledLink[];
</script>

<div>
	{#each crumbs as crumb}
		<a href={crumb.url}>{crumb.name}</a>
	{/each}
</div>