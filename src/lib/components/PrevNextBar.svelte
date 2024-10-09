<script lang="ts">
    import type { LabeledLink } from "$lib/types/types";

	import BackArrow from "$lib/assets/icons/material-icons/arrow_back.svg";
	import ForwardArrow from "$lib/assets/icons/material-icons/arrow_forward.svg";

	export let prev: LabeledLink | null;
	export let next: LabeledLink | null;

	export let shrunk: boolean = false;

	$: prevLabel = shrunk ? "Prev" : prev?.name;
	$: nextLabel = shrunk ? "Next" : next?.name;
</script>


<section>
	<div>{#if prev}<a href={prev.url}><img src={BackArrow}/>{prevLabel}</a>{/if}</div>
	<div>{#if next}<a href={next.url}>{nextLabel}<img src={ForwardArrow}/></a>{/if}</div>
</section>

<style>
	section {
		display: flex;
		justify-content: space-between;
	}

	div, a {
		display: flex;
	}

	img {
		height: 100%;
	}
</style>