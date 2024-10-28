<script module>
	
</script>

<script lang="ts">
	import { setContext, type Snippet } from 'svelte';

	interface Props {
		children: Snippet
	}

	let {children}: Props = $props();

	setContext('code-editor', {

	});
</script>

<section>
	<div>
		{@render children?.()}
	</div>
	<output>
		<!-- svelte-ignore a11y_missing_attribute -->
		<iframe srcdoc={"hi"}></iframe>
	</output>
</section>

<style>
	section {
		border: 2px solid black;
	}
</style>