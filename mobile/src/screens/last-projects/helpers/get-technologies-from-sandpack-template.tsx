import { FaAngular, FaCss3, FaHtml5, FaReact, FaVuejs } from 'react-icons/fa';
import {
	SiAstro,
	SiJavascript,
	SiJest,
	SiNextdotjs,
	SiNodedotjs,
	SiSvelte,
	SiTypescript,
	SiVite
} from 'react-icons/si';
import { TbBrandSolidjs } from 'react-icons/tb';
// import IconFA from 'react-native-vector-icons/FontAwesome';
// import IconFA6Brands from 'react-native-vector-icons/FontAwesome6';
// import {Icon as Icon2} from 'react-native-vector-icons/FontAwesome6Brands';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// import Ionicons from '@expo/vector-icons/Ionicons';import { Ionicons } from '@expo/vector-icons';

import { SandpackTemplate, SandpackTemplatesEnum } from 'types/sandpack';
import React from 'react';
import icon from 'react-syntax-highlighter/dist/esm/languages/prism/icon';
import { Ionicons } from '@expo/vector-icons';

interface Technology {
	name: string;
	icon: JSX.Element;
}

type Technologies = Record<string, Technology>;

export const getTechnologiesFromSandpackTemplate = (
	template: SandpackTemplate
): Technology[] | null => {
	const technologies: Technologies = {
		html: {
			name: 'HTML',
			// icon: <FaHtml5 size={16} className='text-orange-500' />
			// icon: <IconFA name="html5" size={16} className='text-orange-500' />
			icon: <Ionicons name='logo-html5' size={16} className='text-orange-500' />
		},
		css: {
			name: 'CSS',
			// icon: <FaCss3 size={16} className='text-blue-600' />
			icon: <Ionicons name='logo-css3' size={16} className='text-blue-600' />
		},
		angular: {
			name: 'Angular',
			// icon: <FaAngular size={16} className='text-red-500' />
			icon: <Ionicons name='logo-angular' size={16} className='text-red-500' />
		},

		react: {
			name: 'React',
			// icon: <FaReact size={16} className='text-primary' />
			icon: <Ionicons name='logo-react' size={16} className='text-primary' />
		},

		solid: {
			name: 'Solid',
			// icon: <TbBrandSolidjs size={16} className='text-blue-600' />
			icon: <Ionicons name='logo-javascript' size={16} className='text-yellow-500' />
		},

		svelte: {
			name: 'Svelte',
			icon: <SiSvelte size={16} className='text-orange-600' />
		},

		jest: {
			name: 'Jest TypeScript',
			icon: <SiJest size={16} className='text-red-800' />
		},

		typescript: {
			name: 'TypeScript',
			// icon: <SiTypescript size={14} className='text-blue-800' />
			icon: (
				<MaterialCommunityIcons name='language-typescript' size={24} className='text-blue-800' />
			)
		},

		javascript: {
			name: 'JavaScript',
			icon: <SiJavascript size={14} className='mb-0.5 text-yellow-500' />
		},

		vue: {
			name: 'Vue',
			// icon: <FaVuejs size={16} className='text-green-400' />
			icon: <IconFA6Brands name='vuejs' size={16} className='text-orange-500' />
		},

		node: {
			name: 'Node',
			icon: <SiNodedotjs size={16} className='text-green-700' />
		},

		nextjs: {
			name: 'Next.JS',
			icon: <SiNextdotjs size={16} className='' />
		},

		vite: {
			name: 'Vite',
			icon: <SiVite size={16} className='text-purple-500' />
		},

		astro: {
			name: 'Astro',
			icon: <SiAstro size={16} className='' />
		}
	};

	const templateTechnologies: { [key in SandpackTemplatesEnum]: Technology[] } = {
		static: [technologies['html'], technologies['css']],
		angular: [technologies['angular'], technologies['typescript']],
		react: [technologies['react'], technologies['javascript']],
		'react-ts': [technologies['react'], technologies['typescript']],
		solid: [technologies['solid']],
		svelte: [technologies['svelte'], technologies['javascript']],
		'test-ts': [technologies['jest'], technologies['typescript']],
		'vanilla-ts': [technologies['typescript']],
		vanilla: [technologies['javascript']],
		vue: [technologies['vue'], technologies['javascript']],
		'vue-ts': [technologies['vue'], technologies['typescript']],
		node: [technologies['node']],
		nextjs: [technologies['nextjs']],
		vite: [technologies['vite']],
		'vite-react': [technologies['vite'], technologies['react'], technologies['javascript']],
		'vite-react-ts': [technologies['vite'], technologies['react'], technologies['typescript']],
		'vite-vue': [technologies['vite'], technologies['vue'], technologies['javascript']],
		'vite-vue-ts': [technologies['vite'], technologies['vue'], technologies['typescript']],
		'vite-svelte': [technologies['vite'], technologies['svelte'], technologies['javascript']],
		'vite-svelte-ts': [technologies['vite'], technologies['svelte'], technologies['typescript']],
		astro: [technologies['astro']]
	};

	return templateTechnologies[template] || null;
};
