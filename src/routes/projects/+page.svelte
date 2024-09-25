<script lang="ts">
    import ProjectCard from "$lib/components/ProjectCard.svelte";
import { projects } from "$lib/data/projects";


</script>

<article>
    <h1>Projects</h1>

    {#each projects as project}
        <ProjectCard project={project}/>
    {/each}
</article>