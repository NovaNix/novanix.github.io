import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export enum Theme
{
	Light = "light-mode", 
	Dark = "dark-mode"
}

export const currentTheme = writable(Theme.Light);

currentTheme.subscribe(newTheme => {
	// Set the CSS Class for the root

	if (!browser)
		return;

	let root = document.getElementById("root");

	if (root != null)
		root.className = newTheme;
})
