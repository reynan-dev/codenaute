import H4 from 'components/h4';
import P from 'components/p';
import React from 'react';
import { Text, View } from 'react-native';
import { getTechnologiesFromSandpackTemplate } from 'screens/last-projects/helpers/get-technologies-from-sandpack-template';
import { ProjectState } from 'screens/last-projects/last-projects.service';
import { STYLES } from 'styles/styles';
import { twJoin, twMerge } from 'tailwind-merge';
import { SandpackFile } from 'types/project';
import { SandpackTemplate } from 'types/sandpack';

interface ProjectCardProps {
	project: ProjectState;
	customStyle?: string;
}

export const ProjectCard = ({ project, customStyle }: ProjectCardProps) => {
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
				customStyle
			)}
		>
			<H4 childrenStyle='text-primary'>{project.name}</H4>
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
					// <View className='text-sm md:text-base'>
					// 	{/* <SyntaxHighlighter
					// 		style={atomDark}
					// 		customStyle={{
					// 			borderRadius: '0.5rem',
					// 			backgroundColor: COLORS.DARK[800],
					// 			border: 'none',
					// 			boxShadow: 'none',
					// 			marginBottom: 0
					// 		}}
					// 		theme=''
					// 		language={
					// 			getLanguageNameFromExtension(
					// 				project.files[project.main].toString()
					// 			)?.toLocaleLowerCase() ?? 'javascript'
					// 		}
					// 	>
					// 		{code}
					// 	</SyntaxHighlighter> */}
					// </View>
					<P
						containerStyle='rounded-lg border border-dark-800'
						childrenStyle={twJoin('flex justify-center items-center', 'p-4 mt-2')}
					>
						No file in this project yet.
					</P>
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
