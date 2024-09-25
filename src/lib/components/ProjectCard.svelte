<script lang="ts">
    import type { Project } from "$lib/data/projects";

    export let project: Project;

</script>

<div>
    <img src={project.icon} alt={project.name + " Icon"}/>
    <h1><a href={"/projects/" + project.id}>{project.name}</a></h1>
    <p>{project.description}</p>
</div>

<style>
    div {
        border: 1px solid black;
        aspect-ratio: 0.75;

        width: 20%;
    }

    img {
        width: 100%;
        height: auto;
    }
</style>