<script lang="ts">
	export let icon: string;
	export let url: string;

	export let label: string | undefined;

</script>

<span><a href={url}>
	<!-- svelte-ignore a11y-missing-attribute -->
	<img src={icon}/>
	{#if label}
		<span>{label}</span>
	{/if}
</a></span>

<style>
	span {
		display: inline-block;
		color: var(--text-color);
		text-decoration: none;
		/* height: 25px; */
	}

	a span {
		margin-left: 5px;
	}

	a {
		display: flex;
		width: 100%;
		height: 100%;
		text-decoration: none;

		flex-direction: row;
		align-items: center;
	}

	a:hover {
		text-decoration: underline;
	}

	img {
		height: 25px;
	}
</style>