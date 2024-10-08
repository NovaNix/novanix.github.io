<script>
    import Article from '$lib/components/Article.svelte';

    export let data;
</script>

<svelte:head>
    <title>{data.tutorial.title}: {data.page.title}</title>
    <!-- <link rel="icon" href={data.favicon} /> -->
</svelte:head>

<Article title={data.page.title} sideTreeTitle={data.sideTreeTitle} sideTree={data.sideTree} toc={data.toc}>
    {#if data.content}
        {@html data.content}
    {:else}
        {#each data.page.children ?? [] as child}
            <a href={`/tutorials/${data.path}/${child.slug}`}>{child.title}</a><br/>
        {/each}
    {/if}
</Article>

<!-- {data.tutorial.title}
{data.path}

{data.tutorial.file ?? "no file"}

Child Tutorials:
{#each data.tutorial.children ?? [] as child}
    <a href={`/tutorials/${data.path}/${child.slug}`}>{child.title}</a>
{/each} -->