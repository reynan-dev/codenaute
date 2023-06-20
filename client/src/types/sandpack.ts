export enum SandpackTemplatesEnum {
	STATIC = 'static',
	ANGULAR = 'angular',
	REACT = 'react',
	REACT_TS = 'react-ts',
	SOLID = 'solid',
	SVELTE = 'svelte',
	TEST_TS = 'test-ts',
	VANILLA_TS = 'vanilla-ts',
	VANILLA = 'vanilla',
	VUE = 'vue',
	VUE_TS = 'vue-ts',
	NODE = 'node',
	NEXTJS = 'nextjs',
	VITE = 'vite',
	VITE_REACT = 'vite-react',
	VITE_REACT_TS = 'vite-react-ts',
	VITE_VUE = 'vite-vue',
	VITE_VUE_TS = 'vite-vue-ts',
	VITE_SVELTE = 'vite-svelte',
	VITE_SVELTE_TS = 'vite-svelte-ts',
	ASTRO = 'astro'
}

export type SandpackTemplate = (typeof SandpackTemplatesEnum)[keyof typeof SandpackTemplatesEnum];
