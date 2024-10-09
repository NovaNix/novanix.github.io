<script>
    import "$lib/assets/markdown.scss"
    import Article from '$lib/components/Article.svelte';

    export let data;
</script>

<svelte:head>
    <title>{data.tutorial.title}: {data.page.title}</title>
    <!-- <link rel="icon" href={data.favicon} /> -->
</svelte:head>

<Article title={data.page.title} sideTreeTitle={data.sideTreeTitle} sideTree={data.sideTree} toc={data.toc} prev={data.prev} next={data.next} crumbs={data.crumbs}>
    {#if data.content}
        <div class="markdown">{@html data.content}</div>
    {:else}
        {#each data.page.children ?? [] as child}
            <a href={child.url}>{child.title}</a><br/>
        {/each}
    {/if}
</Article>

<style lang="scss">
    //@import "$lib/assets/markdown.scss";
</style>