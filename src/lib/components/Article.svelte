<script lang="ts">
    import GitHubButton from "./GitHubButton.svelte";


	export let title;
	//export let toc;

</script>

<article>
	<h1>{title}</h1>
	<slot></slot>
</article>

<style>
	article {
		max-width: 1012px;
    	margin-left: auto;
    	margin-right: auto;

    	background-color: var(--background-color);
	}
</style>