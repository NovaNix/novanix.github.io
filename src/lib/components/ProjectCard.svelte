<script lang="ts">
    import type { Project } from "$lib/data/projects";
    import type { DisplayMode } from "$lib/types/types";

    export let project: Project;

    export let mode: DisplayMode;

</script>

<div class={mode}><a href={"/projects/" + project.id}>
    <img src={project.icon} alt={project.name + " Icon"}/>
    <hgroup>
        <h1>{project.name}</h1>
        <p>{project.description}</p>
    </hgroup>

</a></div>

<style lang="scss">
    
    div {
        border: 1px solid black;
        border-radius: 15px;
        background-color: var(--background-color);
        
        overflow: hidden;
    }

    hgroup {
        padding: 5px 10px;
    }

    .grid {
        /* aspect-ratio: 0.75; */
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

    h1 {
        padding: 0;
        margin: 0;
    }

    p {
        padding: 0;
        margin: 0;
    }

    a {
        color: var(--text-color);
        text-decoration: none;
    }

</style>