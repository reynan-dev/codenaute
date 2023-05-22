import { FaAngular, FaHtml5, FaReact, FaVuejs } from 'react-icons/fa';
import { TbBrandSolidjs } from 'react-icons/tb';
import {
	SiSvelte,
	SiJest,
	SiTypescript,
	SiJavascript,
	SiNodedotjs,
	SiNextdotjs,
	SiVite,
	SiAstro
} from 'react-icons/si';

export const getTemplateProps = (sandpackTemplate: string) => {
	switch (sandpackTemplate) {
		case 'static':
			return { name: 'Static HTML / CSS', icon: FaHtml5 };
		case 'angular':
			return { name: 'Angular', icon: FaAngular };
		case 'react':
			return { name: 'React', icon: FaReact };
		case 'react-ts':
			return { name: 'React TypeScript', icon: FaReact };
		case 'solid':
			return { name: 'Solid', icon: TbBrandSolidjs };
		case 'svelte':
			return { name: 'Svelte', icon: SiSvelte };
		case 'test-ts':
			return { name: 'Jest TypeScript', icon: SiJest };
		case 'vanilla-ts':
			return { name: 'Typescript', icon: SiTypescript };
		case 'vanilla':
			return { name: 'JavaScript', icon: SiJavascript };
		case 'vue':
			return { name: 'Vue', icon: FaVuejs };
		case 'vue-ts':
			return { name: 'Vue TypeScript', icon: FaVuejs };
		case 'node':
			return { name: 'Node', icon: SiNodedotjs };
		case 'nextjs':
			return { name: 'Next.JS', icon: SiNextdotjs };
		case 'vite':
			return { name: 'Vite', icon: SiVite };
		case 'vite-react':
			return { name: 'Vite React', icon: FaReact };
		case 'vite-react-ts':
			return { name: 'Vite React TypeScript', icon: FaReact };
		case 'vite-vue':
			return { name: 'Vite Vue', icon: FaVuejs };
		case 'vite-vue-ts':
			return { name: 'Vite Vue TypeScript', icon: FaVuejs };
		case 'vite-svelte':
			return { name: 'Vite Svelte', icon: SiSvelte };
		case 'vite-svelte-ts':
			return { name: 'Vite Svelte TypeScript', icon: SiSvelte };
		case 'astro':
			return { name: 'Astro', icon: SiAstro };

		default:
			return { name: 'Typescript', icon: SiTypescript };
	}
};
