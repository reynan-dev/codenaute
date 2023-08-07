import H4 from 'components/h4';
import P from 'components/p';
import React from 'react';
import { Text, View } from 'react-native';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { getLanguageNameFromExtension } from 'screens/last-projects/helpers/get-language-name-from-extension';
import { getTechnologiesFromSandpackTemplate } from 'screens/last-projects/helpers/get-technologies-from-sandpack-template';
import { ProjectState } from 'screens/last-projects/last-projects.service';
import COLORS from 'styles/colors';
import { twJoin } from 'tailwind-merge';
import { SandpackFile } from 'types/project';
import { SandpackTemplate } from 'types/sandpack';

interface ProjectCardProps {
	project: ProjectState;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
	const code =
		project.files[project.main] !== undefined
			? typeof project.files[project.main] === 'string'
				? (project.files[project.main] as string)
				: (project.files[project.main] as SandpackFile).code
			: null;

	return (
		<View
			className={twJoin(
				'flex flex-col gap-y-2 rounded-lg bg-black p-4',
				'transition duration-150 ease-in-out',
				'lg:hover:translate-x-3.5',
				'border border-dark-700'
			)}
		>
			<H4 className='text-primary'>{project.name}</H4>
			<View className='flex gap-x-4'>
				{getTechnologiesFromSandpackTemplate(project.sandpackTemplate as SandpackTemplate)?.map(
					(techno) => (
						<P
							className={twJoin(
								'flex items-center',
								'text-sm font-semibold rounded-full bg-dark-800',
								'px-4 gap-x-2 py-2'
							)}
						>
							{/* <> */}
							{techno.icon}
							<Text>{techno.name}</Text>
							{/* </> */}
						</P>
					)
				)}
			</View>
			{code !== null ? (
				<View className='text-sm md:text-base'>
					{/* <SyntaxHighlighter
						style={atomDark}
						customStyle={{
							borderRadius: '0.5rem',
							backgroundColor: COLORS.DARK[800],
							border: 'none',
							boxShadow: 'none',
							marginBottom: 0
						}}
						theme=''
						language={
							getLanguageNameFromExtension(
								project.files[project.main].toString()
							)?.toLocaleLowerCase() ?? 'javascript'
						}
					>
						{code}
					</SyntaxHighlighter> */}
				</View>
			) : (
				<P
					className={twJoin(
						'flex justify-center items-center',
						'p-4 mt-2',
						'rounded-lg border border-dark-800'
					)}
				>
					No file in this project yet.
				</P>
			)}
		</View>
	);
};
