// import IconFA from 'react-native-vector-icons/FontAwesome';
// import IconFA6Brands from 'react-native-vector-icons/FontAwesome6';
// import {Icon as Icon2} from 'react-native-vector-icons/FontAwesome6Brands';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// import Ionicons from '@expo/vector-icons/Ionicons';import { Ionicons } from '@expo/vector-icons';

import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import COLORS from 'styles/colors';
import { SandpackTemplate, SandpackTemplatesEnum } from 'types/sandpack';
import colors from 'tailwindcss/colors';
import SvgIcon from 'components/svg';

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
			icon: (
				<Ionicons
					name='logo-html5'
					size={16}
					color={colors.orange[500]}
					className='text-orange-500'
				/>
			)
		},
		css: {
			name: 'CSS',
			icon: (
				<Ionicons name='logo-css3' size={16} color={colors.blue[600]} className='text-blue-600' />
			)
		},
		angular: {
			name: 'Angular',
			icon: (
				<Ionicons name='logo-angular' size={16} color={colors.red[500]} className='text-red-500' />
			)
		},

		react: {
			name: 'React',
			icon: (
				<Ionicons
					name='logo-react'
					size={16}
					color={COLORS.PRIMARY.DEFAULT}
					className='text-primary'
				/>
			)
		},

		solid: {
			name: 'Solid',
			icon: <SvgIcon name='solidjs' size={16} color={colors.blue[600]} />
		},

		svelte: {
			name: 'Svelte',
			icon: <SvgIcon name='svelte' color={colors.orange[600]} />
		},

		jest: {
			name: 'Jest TypeScript',
			icon: <SvgIcon name='jest' color={colors.red[700]} />
		},

		typescript: {
			name: 'TypeScript',
			icon: (
				<MaterialCommunityIcons
					name='language-typescript'
					size={24}
					color={colors.blue[800]}
					className='text-blue-800'
				/>
			)
		},

		javascript: {
			name: 'JavaScript',
			icon: (
				<Ionicons
					name='logo-javascript'
					size={16}
					color={colors.yellow[500]}
					className='text-yellow-500'
				/>
			)
		},

		vue: {
			name: 'Vue',
			icon: (
				<Ionicons name='logo-vue' size={16} color={colors.green[400]} className='text-green-400' />
			)
		},

		node: {
			name: 'Node',
			icon: (
				<Ionicons
					name='logo-nodejs'
					size={16}
					color={colors.green[700]}
					className='text-green-700'
				/>
			)
		},

		nextjs: {
			name: 'Next.JS',
			icon: <SvgIcon name='nextjs' color={colors.white} />
		},

		vite: {
			name: 'Vite',
			icon: <SvgIcon name='vite' color={colors.purple[500]} />
		},

		astro: {
			name: 'Astro',
			icon: <SvgIcon name='astro' color={colors.white} />
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
