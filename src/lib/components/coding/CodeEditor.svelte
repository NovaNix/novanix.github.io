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

	</output>
</section>