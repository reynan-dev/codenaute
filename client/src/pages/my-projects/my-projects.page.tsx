import { SandboxTemplate, SandpackFile } from '@codesandbox/sandpack-react/types';
import Container from 'components/container';
import { getLanguageNameFromExtension } from 'helpers/get-language-name-from-extension';
import { getTechnologiesFromSandpackTemplate } from 'helpers/get-technologies-from-sandpack-template';
import { ProjectState } from 'pages/my-projects/my-projects.service';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import COLORS from 'styles/colors';
import { twJoin } from 'tailwind-merge';
import { SandpackTemplate } from 'types/sandpack';
interface MyProjectsPageProps {
	projects: ProjectState[] | null;
}

export const MyProjectsPage = ({ projects }: MyProjectsPageProps) => {
	return (
		<Container className='flex items-center justify-center w-full'>
			<div className='space-y-5 p-14 w-full'>
				<h3 className='mb-10'>My projects</h3>
				<div className='flex flex-col'>
					{projects?.map((project) => {
						const code =
							project.files[project.main] !== undefined
								? typeof project.files[project.main] === 'string'
									? (project.files[project.main] as string)
									: (project.files[project.main] as SandpackFile).code
								: null;
						return (
							<div
								className={twJoin(
									'flex flex-col gap-y-2 rounded-lg bg-dark p-4 my-4',
									'transition duration-150 ease-in-out',
									'lg:hover:translate-x-3.5',
									'border border-dark-700'
								)}
							>
								<h4 className='text-primary'>{project.name}</h4>
								<div className='flex gap-x-4'>
									{getTechnologiesFromSandpackTemplate(
										project.sandpackTemplate as SandpackTemplate
									)?.map((techno) => (
										<p className='text-sm font-semibold px-4 rounded-full bg-primary-100 text-black'>
											{techno}
										</p>
									))}
								</div>
								{code !== null ? (
									<SyntaxHighlighter
										style={atomDark}
										customStyle={{
											borderRadius: '0.5rem',
											backgroundColor: COLORS.DARK[800],
											border: 'none',
											boxShadow: 'none'
										}}
										theme=''
										language={
											getLanguageNameFromExtension(
												project.files[project.main].toString()
											)?.toLocaleLowerCase() ?? 'javascript'
										}
									>
										{code}
									</SyntaxHighlighter>
								) : null}
							</div>
						);
					})}
				</div>
			</div>
		</Container>
	);
};
