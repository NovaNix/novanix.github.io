<script lang="ts">
	import LightModeGitHubIcon from "$lib/assets/icons/github-mark/github-mark.svg"
	import DarkModeGitHubIcon from "$lib/assets/icons/github-mark/github-mark-white.svg"
    import IconButton from "./buttons/IconButton.svelte";

	import { currentTheme, Theme } from "$lib/theme/theme.js"

	export let url: string;

	export let label: boolean = false;

	$: icon = getIcon($currentTheme);

	function getIcon(theme: Theme): string
	{
		switch (theme)
		{
			case Theme.Light:
				return LightModeGitHubIcon;
			case Theme.Dark:
				return DarkModeGitHubIcon;
		}
	}

</script>

<IconButton {icon} {url} label={label ? "GitHub" : ""}/>