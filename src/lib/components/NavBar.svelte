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