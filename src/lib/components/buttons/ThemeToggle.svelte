<script>
    import { currentTheme, Theme } from "$lib/theme/theme";


	function toggleTheme()
	{
		currentTheme.update(current => current == Theme.Light ? Theme.Dark : Theme.Light);
	}

</script>

<button on:click={toggleTheme}>
	TOGGLE!
</button>