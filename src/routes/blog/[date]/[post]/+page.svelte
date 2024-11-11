<script>
    import { page } from "$app/stores";
    import "$lib/assets/markdown.scss"
    import Article from '$lib/components/Article.svelte';
    import RenderedMarkdown from "$lib/components/RenderedMarkdown.svelte";

    export let data;

</script>

<svelte:head>
    <title>{data.blogPost.title}</title>
    <!-- <link rel="icon" href={data.favicon} /> -->
</svelte:head>

<Article title={data.blogPost.title} toc={data.toc}>
    {#key $page.url.pathname}
        <RenderedMarkdown {...data.renderedMarkdown}/>
    {/key}
</Article>

<style lang="scss">
    //@import "$lib/assets/markdown.scss";
</style>