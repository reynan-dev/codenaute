import { FaExclamationCircle, FaSave } from 'react-icons/fa';
import { twJoin } from 'tailwind-merge';

interface ProjectPanelProps {
	className?: string;
}

export const ProjectPanel = ({ className }: ProjectPanelProps) => {
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
						<FaExclamationCircle size={16} className='text-danger' />
						<input
							className='peer h-full w-full rounded-md bg-transparent px-2 py-3.5 focus:outline-none'
							placeholder='project-001'
						/>
					</div>
					<FaSave size={24} className='text-dark-300' />
				</div>
			</div>
		</>
	);
};
