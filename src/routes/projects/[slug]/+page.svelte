<script>
    import Article from "$lib/components/Article.svelte";
    import GitHubButton from "$lib/components/buttons/GitHubButton.svelte";
    import WebsiteButton from "$lib/components/buttons/WebsiteButton.svelte";

	export let data;
</script>

<svelte:head>
    <title>Project: {data.title}</title>
    <link rel="icon" href={data.favicon} />
</svelte:head>

<Article title={data.title} icon={data.icon} toc={data.toc}>
    <svelte:fragment slot="links">
        {#if data.project.github}<GitHubButton url={data.project.github ?? ""} label/>{/if}
        {#if data.project.url}<WebsiteButton url={data.project.url ?? ""} label/>{/if}
    </svelte:fragment>
	
    <div class="markdown">{@html data.content}</div>
</Article>

<style lang="scss">
    @import "$lib/assets/markdown.scss";
</style>