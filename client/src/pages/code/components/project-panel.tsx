import ProjectContext from 'context/project.context';
import { ProjectState } from 'pages/code/code.container';
import { useUpdateProjectService } from 'pages/code/code.service';
import { useContext } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';
import { FaCheckCircle, FaExclamationCircle, FaSave } from 'react-icons/fa';
import { twJoin, twMerge } from 'tailwind-merge';

interface ProjectPanelProps {
	className?: string;
	state: ProjectState;
}

export const ProjectPanel = ({ className, state }: ProjectPanelProps) => {
	const { isProjectSaved } = useContext(ProjectContext);

	const { updateProject, loading: updateProjectLoading } = useUpdateProjectService();

	const renderSavingSatusIcon = () => {
		if (updateProjectLoading || state.autoSaveLoading)
			return <BiLoaderAlt size={16} className='animate-spin text-primary' />;

		if (!isProjectSaved) return <FaExclamationCircle size={16} className='text-warning' />;

		return <FaCheckCircle size={16} className='text-success' />;
	};

	return (
		<>
			<div
				className={twMerge(
					'flex items-center',
					'h-16 w-full',
					'space-x-3.5 px-3.5 py-4',
					'bg-dark-900',
					className
				)}
			>
				<div
					className={twJoin(
						'flex items-center justify-start ',
						'pl-2',
						'h-full w-fit',
						'rounded-md bg-dark-700',
						'focus-within:outline focus-within:outline-1 focus-within:outline-primary'
					)}
				>
					{renderSavingSatusIcon()}
					<input
						className='peer h-full w-52 rounded-md bg-transparent px-2 py-3.5 focus:outline-none'
						placeholder='project-001'
						value={state.projectName}
						onChange={(event) => {
							state.setProjectName(event.target.value);
						}}
					/>
				</div>
				{!isProjectSaved && (
					<button
						onClick={() => {
							updateProject(state.currentProjectData);
						}}
						className='flex h-full items-center justify-center space-x-2 rounded-md bg-dark-700 px-3.5 text-sm text-white'
					>
						<span className=''>Save project</span>
						<FaSave size={16} className='mb-0.5' />
					</button>
				)}
			</div>
		</>
	);
};
