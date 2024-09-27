<script lang="ts">
    import type { ITreeNode } from "$lib/types/treetypes";

    export let node: ITreeNode;

    export let open: boolean = true;
    export let depth: number;

</script>

<li>{node.text}</li>

{#if open && node.children}
{#each node.children as child}
    <svelte:self node={child} depth={depth + 1}/>
{/each}
{/if}
