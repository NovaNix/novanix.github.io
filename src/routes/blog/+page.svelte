<script lang="ts">
    import { getBlogSlug } from "$lib/data/blog";
    import blogs from "$lib/data/blog-list";

    const posts = blogs;

</script>

{#each posts as post}
    <a href={"./blog/" + getBlogSlug(post)}>{post.title}</a>
{/each}

