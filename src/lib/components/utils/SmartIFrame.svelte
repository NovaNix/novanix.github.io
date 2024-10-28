<script lang="ts">

    interface Props {
        title: string,
        srcdoc: string
    }

    let {title, srcdoc}: Props = $props();

    let frame: HTMLIFrameElement;

    $effect(() => {
        srcdoc;
        console.log("frame:")
        console.log(frame)

        // if (frame.contentDocument)
        //     frame.height = frame.contentDocument.body.offsetHeight + 'px';
    })

    function onLoad()
    {
        if (frame == null)
            return;
        if (frame.contentDocument == null)
            return;

        let root = frame.contentDocument.firstElementChild as HTMLElement;

        if (root == null)
            return;

        frame.height = root.offsetHeight + "px";
    }

</script>

<iframe {title} {srcdoc} bind:this={frame} onload={onLoad}></iframe>

<style>
    iframe {
        border: none;
        width: 100%;

        display: block;

        /* height: auto; */
    }
</style>