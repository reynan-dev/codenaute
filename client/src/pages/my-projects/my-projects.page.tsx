import { SandpackFile } from '@codesandbox/sandpack-react/types';
import { getLanguageNameFromExtension } from 'helpers/get-language-name-from-extension';
import { getTechnologiesFromSandpackTemplate } from 'helpers/get-technologies-from-sandpack-template';
import { FilterBar } from 'pages/my-projects/_components/filter-bar';
import { ProjectsPageState } from 'pages/my-projects/my-projects.container';
import { Link } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import COLORS from 'styles/colors';
import { twJoin } from 'tailwind-merge';
import { SandpackTemplate } from 'types/sandpack';
interface MyProjectsPageProps {
	state: ProjectsPageState;
}

export const MyProjectsPage = ({ state }: MyProjectsPageProps) => {
	return (
		<div className='flex items-start justify-center gap-y-5 gap-x-8 w-full relative overflow-hidden'>
			<div className='pl-4 py-8 lg:pl-12 lg:py-12 w-1/3'>
				<FilterBar state={state} className='' />
			</div>
			<div className='w-2/3 h-full pr-4 py-8 lg:pr-12 lg:py-12 overflow-y-scroll'>
				{/* <h3 className='mb-10'>My projects</h3> */}
				<div className='flex flex-col gap-y-6 h-full'>
					{state.filteredProjects !== null && state.filteredProjects.length !== 0 ? (
						state.filteredProjects?.map((project) => {
							const code =
								project.files[project.main] !== undefined
									? typeof project.files[project.main] === 'string'
										? (project.files[project.main] as string)
										: (project.files[project.main] as SandpackFile).code
									: null;
							return (
								<Link
									className={twJoin(
										'flex flex-col gap-y-2 rounded-lg bg-dark p-4',
										'transition duration-150 ease-in-out',
										'lg:hover:translate-x-3.5',
										'border border-dark-700'
									)}
									to={`/code/${project.id}`}
								>
									<h4 className='text-primary'>{project.name}</h4>
									<div className='flex gap-x-4'>
										{getTechnologiesFromSandpackTemplate(
											project.sandpackTemplate as SandpackTemplate
										)?.map((techno) => (
											<p className='flex items-center text-sm font-semibold px-4 rounded-full gap-x-2 bg-dark-800 py-2'>
												<span>{techno.icon}</span>
												<span>{techno.name}</span>
											</p>
										))}
									</div>
									{code !== null ? (
										<div className='text-sm md:text-base'>
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
										</div>
									) : (
										<div className='rounded-lg border border-dark-800 flex justify-center items-center p-4'>
											No file in this project yet.
										</div>
									)}
								</Link>
							);
						})
					) : (
						<h3 className='flex h-full w-full items-center justify-center'>
							{/* <span className='mr-4 text-danger'><</span> */}
							You have no project using this template
						</h3>
					)}
				</div>
			</div>
		</div>
	);
};
