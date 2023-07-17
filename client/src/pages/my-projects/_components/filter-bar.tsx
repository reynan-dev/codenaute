import { getCheckedTemplateParam } from 'helpers/get-cheked-template-param';
import { ChooseTemplateLink } from 'pages/create-project/_components/choose-template-link';
import { ProjectState } from 'pages/my-projects/my-projects.service';
import { twMerge } from 'tailwind-merge';
import { SandpackTemplate, SandpackTemplatesEnum } from 'types/sandpack';

interface FilterBarProps {
	className?: string;
	onFilterProjects: (sandpackTemplate: SandpackTemplate | undefined) => void;
}

export const FilterBar = ({ className, onFilterProjects }: FilterBarProps) => {
	const sandpackTemplates = Object.values(SandpackTemplatesEnum);

	return (
		<div
			className={twMerge(
				'h-fit border border-dark-700 rounded-lg bg-dark p-4',
				// 'grid gap-4 grid-cols-2',
				'flex flex-wrap gap-4 items-start justify-around',
				className
			)}
		>
			{sandpackTemplates.map((template, i) => (
				<ChooseTemplateLink
					className='w-fit grow flex justify-center py-2 h-fit'
					key={i}
					sandpackTemplate={getCheckedTemplateParam(template)}
					onClick={() => onFilterProjects(template)}
				/>
			))}
		</div>
	);
};
