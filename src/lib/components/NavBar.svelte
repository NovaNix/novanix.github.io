<script lang="ts">

	import { page } from '$app/stores';    
    import ThemeToggle from './buttons/ThemeToggle.svelte';

	interface NavButton {
		name: string,
		url: string,
		open?: boolean
	}

	let buttons: NavButton[] = [
		{
			name: "Home",
			url: "/"
		},
		{
			name: "Projects",
			url: "/projects"
		},
		{
			name: "Tutorials",
			url: "/tutorials"
		},
		{
			name: "Blog",
			url: "/blog"
		},
		{
			name: "About",
			url: "/about"
		}

	];

	function isOpen(button: NavButton, path: string)
	{
		// Handle when the home page is selected
		if (button.url == "/")
			return button.url == path;

		// Handle all other buttons
		return path.startsWith(button.url);
	}

</script>

<header>
	<h1>SITE NAME</h1>
	<nav>
		<ul>
			{#each buttons as button}
				<li class:open={isOpen(button, $page.url.pathname)}><a href={button.url}>{button.name}</a></li>
			{/each}
		</ul>
	</nav>
	<div id="header-right">
		<ThemeToggle/>
	</div>
	
</header>


<style>
	header {
		width: 100%;
		height: 56px;

		background-color: var(--background-color);
		display: flex;
	}

	#header-right {
		height: 100%;
		margin-left: auto;
		margin-right: 10px;

		display: flex;
		flex-direction: row;
		align-items: center;

		
	}

	nav {
		height: 100%;
	}

	h1 {
		padding: 0;
		margin: 0 10px;

		height: 100%;
		line-height: 56px;
	}

	ul {
		height: 100%;
		
		padding: 0;
		margin: 0;
		list-style-type: none;

		display: flex;

	}

	li:hover {
		background-color: var(--hover-background-color);
	}

	li.open {
		background-color: var(--hover-background-color);
	}

	a {
		width: 100%;
		height: 100%;
		display: block;

		box-sizing: border-box;
		padding: 0px 10px;

		line-height: 100%;

		text-decoration: none;
		color: var(--text-color);

		display: flex;
  		justify-content: center;
  		align-items: center;
	}
</style>