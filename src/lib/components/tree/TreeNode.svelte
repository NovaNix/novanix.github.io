<script lang="ts">
    import type { ITreeNode } from "$lib/types/treetypes";

    export let node: ITreeNode;

    export let open: boolean = true;
    export let depth: number;

</script>

<details {open}>
    <summary><a href={node.url}>{node.text}</a></summary>

    <div>
        {#if node.children}
        {#each node.children as child}
            <svelte:self node={child} depth={depth + 1}/>
        {/each}
        {/if}
    </div>
</details>

<style>

    div {
        margin-left: 20px;
    }

    a {
        color: var(--text-color);
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }
</style>