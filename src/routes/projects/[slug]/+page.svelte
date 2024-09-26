<script>
    import Article from "$lib/components/Article.svelte";
    import GitHubButton from "$lib/components/GitHubButton.svelte";

	export let data;
</script>

<link rel="icon" href={data.favicon} />

<Article title={data.title}>
	<GitHubButton url={data.project.github ?? ""} label/>
</Article>

<h1>{data.title}</h1>
<div>{@html data.content}</div>