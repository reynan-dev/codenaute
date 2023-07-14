import { SandpackTemplate, SandpackTemplatesEnum } from 'types/sandpack';

export const getTechnologiesFromSandpackTemplate = (
	template: SandpackTemplate
): string[] | null => {
	const templateTechnologies: { [key in SandpackTemplatesEnum]: string[] } = {
		static: ['HTML', 'CSS'],
		angular: ['Angular', 'TypeScript'],
		react: ['React', 'JavaScript'],
		'react-ts': ['React', 'TypeScript'],
		solid: ['Solid'],
		svelte: ['Svelte', 'JavaScript'],
		'test-ts': ['Jest', 'TypeScript'],
		'vanilla-ts': ['JavaScript', 'TypeScript'],
		vanilla: ['JavaScript', 'Vanilla'],
		vue: ['Vue', 'JavaScript'],
		'vue-ts': ['Vue', 'TypeScript'],
		node: ['Node.js'],
		nextjs: ['Next.js'],
		vite: ['Vite'],
		'vite-react': ['Vite', 'React', 'JavaScript'],
		'vite-react-ts': ['Vite', 'React', 'TypeScript'],
		'vite-vue': ['Vite', 'Vue', 'JavaScript'],
		'vite-vue-ts': ['Vite', 'Vue', 'TypeScript'],
		'vite-svelte': ['Vite', 'Svelte', 'JavaScript'],
		'vite-svelte-ts': ['Vite', 'Svelte', 'TypeScript'],
		astro: ['Astro']
	};

	const technologies = templateTechnologies[template];

	return technologies || null;
};
