import { useState } from 'react';
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
import { Link } from 'react-router-dom';
import { twJoin } from 'tailwind-merge';

interface TemplateLinkProps {
	sandpackTemplate: string;
}

export const ChooseTemplateLink = ({ sandpackTemplate }: TemplateLinkProps) => {
	const renderContent = (template: string) => {
		if (template === 'static')
			return {
				icon: <FaHtml5 size={20} className='mt-1 text-orange-500' />,
				name: 'HTML / CSS'
			};

		if (template === 'angular')
			return {
				icon: <FaAngular size={20} className='mt-1 text-red-500' />,
				name: 'Angular'
			};

		if (template === 'react')
			return {
				icon: <FaReact size={20} className='mt-1 text-primary' />,
				name: 'React'
			};

		if (template === 'react-ts')
			return {
				icon: <FaReact size={20} className='mt-1 text-primary' />,
				name: 'React TypeScript'
			};

		if (template === 'solid')
			return {
				icon: <TbBrandSolidjs size={20} className='mt-1 text-blue-600' />,
				name: 'Solid'
			};

		if (template === 'svelte')
			return {
				icon: <SiSvelte size={20} className='mt-1 text-orange-600' />,
				name: 'Svelte'
			};

		if (template === 'test-ts')
			return {
				icon: <SiJest size={20} className='mt-1 text-red-800' />,
				name: 'Jest TypeScript'
			};

		if (template === 'vanilla-ts')
			return {
				icon: <SiTypescript size={20} className='mt-1 text-blue-800' />,
				name: 'TypeScript'
			};

		if (template === 'vanilla')
			return {
				icon: <SiJavascript size={20} className='mt-0.5 text-yellow-500' />,
				name: 'JavaScript'
			};

		if (template === 'vue')
			return {
				icon: <FaVuejs size={20} className='mt-1 text-green-400' />,
				name: 'Vue'
			};

		if (template === 'vue-ts')
			return {
				icon: <FaVuejs size={20} className='mt-1 text-green-400' />,
				name: 'Vue TypeScript'
			};

		if (template === 'node')
			return {
				icon: <SiNodedotjs size={20} className='mt-1 text-green-700' />,
				name: 'Node'
			};

		if (template === 'nextjs')
			return {
				icon: <SiNextdotjs size={20} className='mt-1 ' />,
				name: 'Next.JS'
			};

		if (template === 'vite')
			return {
				icon: <SiVite size={20} className='mt-1 text-purple-500' />,
				name: 'Vite'
			};

		if (template === 'vite-react')
			return {
				icon: <FaReact size={20} className='mt-1 text-primary' />,
				name: 'Vite React'
			};

		if (template === 'vite-react-ts')
			return {
				icon: <FaReact size={20} className='mt-1 text-primary' />,
				name: 'Vite React - TypeScript'
			};

		if (template === 'vite-vue')
			return {
				icon: <FaVuejs size={20} className='mt-1 text-green-400' />,
				name: 'Vite Vue'
			};

		if (template === 'vite-vue-ts')
			return {
				icon: <FaVuejs size={20} className='mt-1 text-green-400' />,
				name: 'Vite Vue - TypeScript'
			};

		if (template === 'vite-svelte')
			return {
				icon: <SiSvelte size={20} className='mt-1 text-orange-600' />,
				name: 'Vite Svelte'
			};

		if (template === 'vite-svelte-ts')
			return {
				icon: <SiSvelte size={20} className='mt-1 text-orange-600' />,
				name: 'Vite Svelte - TypeScript'
			};

		if (template === 'astro')
			return {
				icon: <SiAstro size={20} className='mt-1 ' />,
				name: 'Astro'
			};

		return undefined;
	};

	const [linkContent] = useState(renderContent(sandpackTemplate));

	if (linkContent === undefined) return null;

	return (
		<Link
			to={`/code?template=${sandpackTemplate}`}
			className={twJoin(
				'flex',
				'space-x-2 p-5',
				'rounded-lg border text-lg',
				'transition duration-150 ease-in-out',
				'hover:bg-dark-800'
			)}
		>
			{linkContent.icon}
			<span>{linkContent.name}</span>
		</Link>
	);
};
