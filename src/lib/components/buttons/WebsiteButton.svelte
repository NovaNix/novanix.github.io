<script lang="ts">
    import LightModeWebsiteIcon from "$lib/assets/icons/material-icons/web.svg"
    import IconButton from "./IconButton.svelte";

    let icon = LightModeWebsiteIcon;

    export let url: string;

	export let label: boolean = false;
</script>

<IconButton {icon} {url} label={label ? "Website" : ""}/>