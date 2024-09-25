<script lang="ts">
    import type { Project } from "$lib/data/projects";

    export let project: Project;

</script>

<div>
    <img src={project.icon} alt={project.name + " Icon"}/>
    <h1><a href={"/projects/" + project.id}>{project.name}</a></h1>
    <p>{project.description}</p>
</div>