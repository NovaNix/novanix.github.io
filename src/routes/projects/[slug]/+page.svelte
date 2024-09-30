<script>
    import Article from "$lib/components/Article.svelte";
    import GitHubButton from "$lib/components/buttons/GitHubButton.svelte";

	export let data;
</script>

<svelte:head>
    <title>{data.title}</title>
    <link rel="icon" href={data.favicon} />
</svelte:head>

<Article title={data.title} icon={data.icon} toc={data.toc}>
    <svelte:fragment slot="links">
        {#if data.project.github}<GitHubButton url={data.project.github ?? ""} label/>{/if}
    </svelte:fragment>
	
    {@html data.content}
</Article>