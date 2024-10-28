<script lang="ts">
    import type { RenderedMarkdown } from "$lib/utils/markdown";
    import { hydrateComponent } from "$lib/utils/markdownsvelte";
    import { onDestroy, onMount, unmount } from "svelte";

	let { html, frontmatter, components }: RenderedMarkdown = $props();

	let hydratedComponents: ReturnType<typeof hydrateComponent>[] = [];

	onMount(() => {
	    for (let component of components)
        {
            let hydrated = hydrateComponent(component);
			hydratedComponents.push(hydrated);
        }

		//console.log("Mounted RenderedMarkdown")
	});

	onDestroy(() => {
		while (hydratedComponents.length > 0)
		{
			let component = hydratedComponents.pop();

			if (component == undefined)
				continue;

			unmount(component);

			//console.log("Unmounted component");
		}

		//console.log("Destoryed Markdown")
	})
</script>

<div class="markdown">{@html html}</div>