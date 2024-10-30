<script lang="ts">
    import SmartIFrame from "$lib/components/utils/SmartIFrame.svelte";
import { getContext } from "svelte";


    let editor = getContext('code-editor') as EditorState;

    let preview = $derived.by(() => {
        let htmlTab = editor.tabs["html"];
        let cssTab = editor.tabs["css"];

        const head = `<base target="_blank">`

        let contents = "";

        if (htmlTab)
        {
            contents += htmlTab.code;
        }

        if (cssTab)
        {
            contents += `<style>${cssTab.code}</style>`
        }

        return `<!DOCTYPE html><html><head>${head}</head><body>${contents}</body></html>`;
    })

</script>

<SmartIFrame title="preview" srcdoc={preview}/>