import H4 from 'components/h4';
import P from 'components/p';
import React from 'react';
import { View } from 'react-native';
import CodeHighlighter from 'react-native-code-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { getTechnologiesFromSandpackTemplate } from 'screens/last-projects/helpers/get-technologies-from-sandpack-template';
import { ProjectState } from 'screens/last-projects/last-projects.service';
import COLORS from 'styles/colors';
import { STYLES } from 'styles/styles';
import { twJoin, twMerge } from 'tailwind-merge';
import { SandpackFile } from 'types/project';
import { SandpackTemplate } from 'types/sandpack';

interface ProjectCardProps {
	project: ProjectState;
	containerStyle?: string;
}

export const ProjectCard = ({ project, containerStyle }: ProjectCardProps) => {
	const code =
		project.files[project.main] !== undefined
			? typeof project.files[project.main] === 'string'
				? (project.files[project.main] as string)
				: (project.files[project.main] as SandpackFile).code
			: null;

	return (
		<View
			className={twMerge(
				'flex flex-col gap-y-2 rounded-lg bg-black p-4',
				'transition duration-150 ease-in-out',
				'lg:hover:translate-x-3.5',
				'border border-dark-700',
				containerStyle
			)}
		>
			<H4 childrenStyle='text-primary'>{project.name}</H4>
			<P childrenStyle='italic text-xs mb-2 text-dark-300'>{`Publié le ${new Date(
				project.createdAt
			).toLocaleDateString()}`}</P>
			<View className='flex flex-row flex-1 justify-start gap-x-3'>
				{getTechnologiesFromSandpackTemplate(project.sandpackTemplate as SandpackTemplate)?.map(
					(techno) => (
						<View
							style={STYLES.fitContent}
							className={twJoin(
								'flex flex-row items-center justify-start',
								'rounded-full bg-dark-800',
								'px-4 py-1.5'
							)}
						>
							<View className='mr-2'>{techno.icon}</View>
							<P childrenStyle='text-sm'>{techno.name}</P>
						</View>
					)
				)}
			</View>
			<View className='pt-2'>
				{code !== null ? (
					<View className='text-sm md:text-base rounded-lg overflow-hidden'>
						<CodeHighlighter
							hljsStyle={atomOneDark}
							containerStyle={{
								backgroundColor: COLORS.DARK[800],
								marginBottom: 0,
								padding: 8,
								width: '100%'
							}}
						>
							{code}
						</CodeHighlighter>
					</View>
				) : (
					<P
						containerStyle='rounded-lg border border-dark-800'
						childrenStyle={twJoin('flex justify-center items-center', 'p-4 mt-2')}
					>
						No file in this project yet.
					</P>
				)}
			</View>
		</View>
	);
};
