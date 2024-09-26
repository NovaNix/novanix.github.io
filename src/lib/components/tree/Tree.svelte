<script lang="ts">
    import type { ITreeNode } from "$lib/types/treetypes";
    import TreeNode from "./TreeNode.svelte";

    export let roots: ITreeNode[];
</script>

{#each roots as root}
    <TreeNode node={root} depth={0}/>
{/each}