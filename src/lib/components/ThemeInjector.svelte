<script lang="ts">
    import type { RuleSet } from "$lib/assets/themes/vs_code_theme";
    import { currentTheme, Theme } from "$lib/theme/theme";

	export let theme: Theme;
	export let themeCode: RuleSet[];

	function generateClass(set: RuleSet): string
	{
		let css = `${set.selector} {\n`;

		for (let rule of set.rules)
		{
			css += `${rule.prop}: ${rule.value};\n`;
		}

		css += "}\n";

		return css;
	}

	$: css = themeCode.map(value => generateClass(value)).reduce((accumulator, currentValue) => accumulator + currentValue);
</script>

<!-- <div>
	<style>
		{#each themeCode as ruleSet}
			.{ruleSet.class} {
				{#each ruleSet.rules as rule}
					{rule.prop}: {rule.value};
				{/each}
			}
		{/each}
	</style>
</div> -->

{#if $currentTheme == theme}
	{@html `<style>${css}</style>`}
{/if}
