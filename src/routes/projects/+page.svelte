<script lang="ts">
    import Article from "$lib/components/Article.svelte";
    import ProjectCard from "$lib/components/ProjectCard.svelte";
    import { projects } from "$lib/data/projects";
    import type { DisplayMode } from "$lib/types/types";

    let mode: DisplayMode = "grid";

</script>

<Article title="Projects">
    <div id="project-list" class={mode}>
        {#each projects as project}
            <ProjectCard project={project} mode={mode}/>
        {/each}
    </div>
    
</Article>

<style>
    #project-list.grid {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 10px;
    }

    #project-list.list {
        display: flex;
        flex-direction: column;
    }
</style>