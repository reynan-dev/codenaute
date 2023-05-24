import { useSandpack } from '@codesandbox/sandpack-react';
import { ProjectState } from 'pages/code/code.container';
import { SandpackTemplate, useSaveProjectService } from 'pages/code/code.service';
import { BiLoaderAlt } from 'react-icons/bi';
import { FaCheckCircle, FaExclamationCircle, FaSave } from 'react-icons/fa';
import { twJoin } from 'tailwind-merge';

interface ProjectPanelProps {
	className?: string;
	template: SandpackTemplate | undefined;
	state: ProjectState;
}

export const ProjectPanel = ({ className, state, template }: ProjectPanelProps) => {
	const { sandpack } = useSandpack();
	const { saveProject, saveProjectLoading } = useSaveProjectService(
		{
			name: state.projectName,
			files: JSON.stringify(sandpack.files),
			sandpackTemplate: template ?? ''
		},
		state.setIsProjectSaved
	);

	const renderSavingSatusIcon = () => {
		if (saveProjectLoading) return <BiLoaderAlt size={16} className='animate-spin text-primary' />;

		if (!state.isProjectSaved) return <FaExclamationCircle size={16} className='text-warning' />;

		return (
			<>
				<FaCheckCircle size={16} className='text-success' />
			</>
		);
	};

	return (
		<>
			<div className={className}>
				<div
					className={twJoin(
						'flex items-center',
						'h-14',
						'space-x-3.5 px-3.5 py-4',
						'bg-dark-900',
						'border border-l-0 border-t-0',
						'border-b-dark-700 border-r-dark-700'
					)}
				>
					<h3 className='text-sm font-normal text-dark-300'>Project</h3>
					<div
						className={twJoin(
							'flex items-center justify-start ',
							'pl-2',
							'h-full w-full',
							'rounded-md bg-dark-700',
							'focus-within:outline focus-within:outline-1 focus-within:outline-primary'
						)}
					>
						{renderSavingSatusIcon()}
						<input
							className='peer h-full w-full rounded-md bg-transparent px-2 py-3.5 focus:outline-none'
							placeholder='project-001'
							value={state.projectName}
							onChange={(event) => {
								state.setProjectName(event.target.value);
							}}
						/>
					</div>
					<button
						onClick={() => {
							saveProject();
						}}
					>
						<FaSave size={16} className='text-dark-300' />
					</button>
				</div>
			</div>
		</>
	);
};
