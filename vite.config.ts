import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	assetsInclude: [
		"md"
	],

	css: {
        preprocessorOptions: {
            scss: {
                api: 'modern',
                // additionalData: '@use "$lib/assets/scss/variables.scss" as *;'
            }
        }
    },
});
