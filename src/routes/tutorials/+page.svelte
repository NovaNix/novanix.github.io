<script lang="ts">
    import Article from "$lib/components/Article.svelte";
import { tutorials } from "$lib/data/tutorial-list";

</script>

<Article title="Tutorials">
    <ul>
        {#each tutorials as tutorial}
            <li><a href={tutorial.url}>{tutorial.title}</a></li>
        {/each}
    </ul>
</Article>
