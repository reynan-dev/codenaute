import { FaHtml5, FaAngular, FaReact, FaVuejs } from 'react-icons/fa';
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
import { TbBrandSolidjs } from 'react-icons/tb';

export const renderTemplateElements = (sandpackTemplate: string) => {
	switch (sandpackTemplate) {
		case 'static':
			return (
				<>
					<FaHtml5 size={20} className='mt-1 text-orange-500' />
					<span>HTML / CSS</span>
				</>
			);
		case 'angular':
			return (
				<>
					<FaAngular size={20} className='mt-1 text-red-500' />
					<span>Angular</span>
				</>
			);
		case 'react':
			return (
				<>
					<FaReact size={20} className='mt-1 text-primary' />
					<span>React</span>
				</>
			);
		case 'react-ts':
			return (
				<>
					<FaReact size={20} className='mt-1 text-primary' />
					<span>React TypeScript</span>
				</>
			);
		case 'solid':
			return (
				<>
					<TbBrandSolidjs size={20} className='mt-1 text-blue-600' />
					<span>Solid</span>
				</>
			);
		case 'svelte':
			return (
				<>
					<SiSvelte size={20} className='mt-1 text-orange-600' />
					<span>Svelte</span>
				</>
			);
		case 'test-ts':
			return (
				<>
					<SiJest size={20} className='mt-1 text-red-800' />
					<span>Jest TypeScript</span>
				</>
			);
		case 'vanilla-ts':
			return (
				<>
					<SiTypescript size={20} className='mt-1 text-blue-800' />
					<span>TypeScript</span>
				</>
			);
		case 'vanilla':
			return (
				<>
					<SiJavascript size={20} className='mt-0.5 text-yellow-500' />
					<span>JavaScript</span>
				</>
			);
		case 'vue':
			return (
				<>
					<FaVuejs size={20} className='mt-1 text-green-400' />
					<span>Vue</span>
				</>
			);
		case 'vue-ts':
			return (
				<>
					<FaVuejs size={20} className='mt-1 text-green-400' />
					<span>Vue TypeScript</span>
				</>
			);
		case 'node':
			return (
				<>
					<SiNodedotjs size={20} className='mt-1 text-green-700' />
					<span>Node</span>
				</>
			);
		case 'nextjs':
			return (
				<>
					<SiNextdotjs size={20} className='mt-1 ' />
					<span>Next.JS</span>
				</>
			);
		case 'vite':
			return (
				<>
					<SiVite size={20} className='mt-1 text-purple-500' />
					<span>Vite</span>
				</>
			);
		case 'vite-react':
			return (
				<>
					<FaReact size={20} className='mt-1 text-primary' />
					<span>Vite React</span>
				</>
			);
		case 'vite-react-ts':
			return (
				<>
					<FaReact size={20} className='mt-1 text-primary' />
					<span>Vite React - TypeScript</span>
				</>
			);
		case 'vite-vue':
			return (
				<>
					<FaVuejs size={20} className='mt-1 text-green-400' />
					<span>Vite Vue</span>
				</>
			);
		case 'vite-vue-ts':
			return (
				<>
					<FaVuejs size={20} className='mt-1 text-green-400' />
					<span>Vite Vue - TypeScript</span>
				</>
			);
		case 'vite-svelte':
			return (
				<>
					<SiSvelte size={20} className='mt-1 text-orange-600' />
					<span>Vite Svelte</span>
				</>
			);
		case 'vite-svelte-ts':
			return (
				<>
					<SiSvelte size={20} className='mt-1 text-orange-600' />
					<span>Vite Svelte - TypeScript</span>
				</>
			);
		case 'astro':
			return (
				<>
					<SiAstro size={20} className='mt-1 ' />
					<span>Astro</span>
				</>
			);
		default:
			return (
				<>
					<SiTypescript size={20} className='mt-1 text-primary' />
					<span>TypeScript</span>
				</>
			);
	}
};
