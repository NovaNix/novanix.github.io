<script lang="ts">
    import SmartIFrame from "$lib/components/utils/SmartIFrame.svelte";
import { getContext } from "svelte";


    let editor = getContext('code-editor') as EditorState;

    let preview = $derived.by(() => {
        let htmlTab = editor.tabs["html"];
        let cssTab = editor.tabs["css"];

        let html = "";

        if (htmlTab)
        {
            html += htmlTab.code;
        }

        if (cssTab)
        {
            html += `<style>${cssTab.code}</style>`
        }

        return html;
    })

</script>

<SmartIFrame title="preview" srcdoc={preview}/>