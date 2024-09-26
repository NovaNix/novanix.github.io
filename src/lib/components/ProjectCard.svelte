<script lang="ts">
    import type { Project } from "$lib/data/projects";
    import type { DisplayMode } from "$lib/types/types";

    export let project: Project;

    export let mode: DisplayMode;

</script>

<div class={mode}>
    <img src={project.icon} alt={project.name + " Icon"}/>
    <h1><a href={"/projects/" + project.id}>{project.name}</a></h1>
    <p>{project.description}</p>
</div>

<style lang="css">
    
    div {
        border: 1px solid black;
        border-radius: 15px;
        background-color: var(--background-color);
        
        overflow: hidden;
    }

    .grid {
        aspect-ratio: 0.75;
        width: 20%;
    }

    .list {

    }

    img {
        aspect-ratio: 1;
        width: 100%;
        height: auto;

        object-fit: cover
    }


</style>