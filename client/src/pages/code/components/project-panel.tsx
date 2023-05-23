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
						'space-x-4 px-3.5 py-4',
						'bg-dark-900',
						'border border-l-0 border-t-0',
						'border-b-dark-700 border-r-dark-700'
					)}
				>
					<h3 className='text-sm font-normal text-dark-300'>Project</h3>
					<input
						className={twJoin(
							'flex items-center justify-start ',
							'px-3',
							'h-full w-full',
							'rounded-full bg-dark-700',
							'focus:border focus:border-primary focus:outline-none'
						)}
					></input>
				</div>
			</div>
		</>
	);
};
