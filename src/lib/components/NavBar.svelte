<script lang="ts">

	interface NavButton {
		name: string,
		url: string
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
			name: "About",
			url: "/about"
		}

	]

</script>

<nav>
	<ul>
		{#each buttons as button}
			<li><a href={button.url}>{button.name}</a></li>
		{/each}
	</ul>
</nav>

<style>
	nav {
		width: 100%;
		height: 56px;

		background-color: var(--background-color);
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

	span {

	}
</style>