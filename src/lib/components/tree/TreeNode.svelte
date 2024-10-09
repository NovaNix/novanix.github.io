<script lang="ts">
    import type { ITreeNode } from "$lib/types/treetypes";

    export let node: ITreeNode;

    export let open: boolean = true;
    export let depth: number;

    $: isCurrentPage = node.url == window.location.pathname;

</script>

<details {open}>
    <summary class={node.children ? "" : "childless"}><a href={node.url} class={isCurrentPage ? "currentPage" : ""}>{node.text}</a></summary>

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

    a.currentPage {
        text-decoration: underline;
    }

    summary.childless {
        list-style: none;
    }
</style>