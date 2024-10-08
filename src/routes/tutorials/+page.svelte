<script lang="ts">
    import { tutorials } from "$lib/data/tutorial-list";

</script>

Tutorials:
{#each tutorials as tutorial}
    <a href={`tutorials/${tutorial.slug}`}>{tutorial.title}</a>
{/each}