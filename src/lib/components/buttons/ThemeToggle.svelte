<script lang="ts">
    import { currentTheme, Theme } from "$lib/theme/theme";
	import LightModeIcon from "$lib/assets/icons/material-icons/light_mode.svg"
	import DarkModeIcon from "$lib/assets/icons/material-icons/dark_mode.svg"

	$: icon = getIcon($currentTheme);

	function getIcon(theme: Theme): string
	{
		switch (theme)
		{
			case Theme.Light:
				return DarkModeIcon;
			case Theme.Dark:
				return LightModeIcon;
		}
	}

	function toggleTheme()
	{
		currentTheme.update(current => current == Theme.Light ? Theme.Dark : Theme.Light);
	}

</script>

<button on:click={toggleTheme}>
	<!-- svelte-ignore a11y-missing-attribute -->
	<img src={icon}/>
</button>

<style>
	button {
		background: transparent;
		width: 3em;
		height: 3em;
		padding: 0;
		margin: 0;
		border: none;

		box-sizing: border-box;

		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
</style>