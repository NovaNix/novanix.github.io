<script lang="ts">
    import type { LabeledLink } from "$lib/types/types";

	import RightArrow from "svelte-material-icons/ArrowRight.svelte"
	import LeftArrow from "svelte-material-icons/ArrowLeft.svelte"

	// import BackArrow from "$lib/assets/icons/material-icons/arrow_back.svg";
	// import ForwardArrow from "$lib/assets/icons/material-icons/arrow_forward.svg";

	export let prev: LabeledLink | null;
	export let next: LabeledLink | null;

	export let shrunk: boolean = false;

	$: prevLabel = shrunk ? "Prev" : prev?.name;
	$: nextLabel = shrunk ? "Next" : next?.name;
</script>


<section>
	<div>{#if prev}<a href={prev.url}>
		<LeftArrow/>
		{prevLabel}
	</a>{/if}</div>
	<div>{#if next}<a href={next.url}>
		{nextLabel}
		<RightArrow/>
	</a>{/if}</div>
</section>

<style>
	section {
		display: flex;
		justify-content: space-between;
	}

	div, a {
		display: flex;
		align-items: center;
	}
</style>