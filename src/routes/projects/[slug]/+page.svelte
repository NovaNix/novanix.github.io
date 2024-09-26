<script>
    import Article from "$lib/components/Article.svelte";
    import GitHubButton from "$lib/components/GitHubButton.svelte";

	export let data;
</script>

<svelte:head>
    <link rel="icon" href={data.favicon} />
</svelte:head>

<!-- {console.log(data.content)} -->
<!-- {console.log(data.page)} -->

<Article title={data.title}>
    <svelte:fragment slot="links">
        {#if data.project.github}<GitHubButton url={data.project.github ?? ""} label/>{/if}
    </svelte:fragment>
	
    {@html data.content}
</Article>

<!-- <h1>{data.title}</h1>
<div>{@html data.content}</div> -->