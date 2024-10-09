<script lang="ts">
    import type { LabeledLink } from "$lib/types/types";

	export let prev: LabeledLink | null;
	export let next: LabeledLink | null;
</script>


<div>
	<div>{#if prev}<a href={prev.url}>{prev.name}</a>{/if}</div>
	<div>{#if next}<a href={next.url}>{next.name}</a>{/if}</div>
</div>

<style>

</style>