import { SandpackFile } from '@codesandbox/sandpack-react/types';
import Input from 'components/input';
import { getLanguageNameFromExtension } from 'helpers/get-language-name-from-extension';
import { getTechnologiesFromSandpackTemplate } from 'helpers/get-technologies-from-sandpack-template';
import { FilterBar } from 'pages/my-projects/_components/filter-bar';
import { FilterModal } from 'pages/my-projects/_components/filter-modal';
import { ProjectsPageState } from 'pages/my-projects/my-projects.container';
import { FiFilter } from 'react-icons/fi';
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
		<>
			<div
				className={twJoin(
					'flex items-start justify-center',
					'gap-y-5 gap-x-8 w-full h-full',
					'lg:overflow-hidden lg:scrollbar-hidden lg:h-fit'
				)}
			>
				<div
					className={twJoin(
						'hidden',
						'w-1/3 h-full pl-4 py-8',
						'scrollbar-hidden overflow-y-scroll',
						'lg:block',
						'lg:pl-12 lg:py-12'
					)}
				>
					<FilterBar state={state} className='' />
				</div>
				<div
					className={twJoin(
						'flex flex-col gap-y-8',
						'w-full h-full px-4 py-8',
						'lg:overflow-y-scroll',
						'lg:w-2/3',
						'lg:pr-8 py-8',
						'lg:pr-12 lg:py-12'
					)}
				>
					<div className='w-full lg:hidden flex gap-x-6 items-center sticky top-[64px] z-20 sm:p-4 py-4'>
						<Input
							className='w-full'
							label='Search'
							onChange={(e) => state.setInputSearch(e.target.value)}
						/>
						<button
							onClick={() => state.setIsModalOpen(true)}
							className='rounded-xl bg-transparent h-16 w-16 aspect-square flex justify-center items-center'
						>
							<FiFilter className='text-primary' size={28} />
						</button>
					</div>

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
											'flex flex-col gap-y-2 rounded-lg bg-black p-4',
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
												<p
													className={twJoin(
														'flex items-center',
														'text-sm font-semibold rounded-full bg-dark-800',
														'px-4 gap-x-2 py-2'
													)}
												>
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
												</SyntaxHighlighter>
											</div>
										) : (
											<div
												className={twJoin(
													'flex justify-center items-center',
													'p-4 mt-2',
													'rounded-lg border border-dark-800'
												)}
											>
												No file in this project yet.
											</div>
										)}
									</Link>
								);
							})
						) : (
							<h3 className='flex h-full w-full items-center justify-center'>
								You have no project using this template
							</h3>
						)}
					</div>
				</div>
			</div>

			<FilterModal
				state={state}
				isOpen={state.isModalOpen}
				onClose={() => state.setIsModalOpen(false)}
			/>
		</>
	);
};
