import { writable } from 'svelte/store';

export enum Theme
{
	Light = "light-mode", 
	Dark = "dark-mode"
}

export const currentTheme = writable(Theme.Light);

currentTheme.subscribe(newTheme => {
	// Set the CSS Class for the root

	let root = document.getElementById("root");

	if (root != null)
		root.className = newTheme;
})
