<script lang="ts">
    import type { Snippet } from "svelte";

    //let testProp: string;

    interface Props {
		testProp?: string;
        children?: Snippet;
	}

    let { testProp = "NONE!", children }: Props = $props();

    let count = $state(0);

    function onClick()
    {
        count += 1;
    }

</script>

<div>
    test!!!
    got prop: {testProp}
    <button onclick={onClick}>Click Me! {count}</button>

    {@render children?.()}
</div>

<style>
    div {
        border-color: red;
        border-width: 5px;
        border-style: solid;
    }
</style>

