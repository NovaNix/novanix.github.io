<script lang="ts">
	export let icon: string;
	export let url: string;

	export let label: string | undefined;

</script>

<span>
	<!-- svelte-ignore a11y-missing-attribute -->
	<img src={icon}/>
	{#if label}
		<span>{label}</span>
	{/if}
</span>