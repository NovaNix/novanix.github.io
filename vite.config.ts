import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	assetsInclude: [
		"**/*.md"
	],
	build: {
		assetsInlineLimit: 0
	}
});
