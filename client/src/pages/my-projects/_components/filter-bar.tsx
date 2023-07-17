import Input from 'components/input';
import { getCheckedTemplateParam } from 'helpers/get-cheked-template-param';
import { ChooseTemplateLink } from 'pages/create-project/_components/choose-template-link';
import { filterProjectsByTemplate } from 'pages/my-projects/helpers/filter-projects-by-template';
import { searchProjects } from 'pages/my-projects/helpers/search-projects';
import { ProjectsPageState } from 'pages/my-projects/my-projects.container';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { SandpackTemplate, SandpackTemplatesEnum } from 'types/sandpack';

interface FilterBarProps {
	className?: string;
	state: ProjectsPageState;
}

export const FilterBar = ({ className, state }: FilterBarProps) => {
	const [selectedTemplate, setSelectedTemplate] = useState<SandpackTemplate | null>(null);
	const [inputSearch, setInputSearch] = useState<string>('');
	const sandpackTemplates = Object.values(SandpackTemplatesEnum);

	const handleOnlick = (template: SandpackTemplatesEnum) => {
		if (state.projects === null) return;
		state.setFilteredProjects(filterProjectsByTemplate(template, state.projects));
		setSelectedTemplate(template);
	};

	const handleOnChange = (searchText: string) => {
		console.log({ searchText });
		setInputSearch(searchText);
	};

	useEffect(() => {
		if (state.filteredProjects === null) return;
		state.setFilteredProjects(searchProjects(state.filteredProjects, inputSearch));
	}, [inputSearch, state]);

	return (
		<div
			className={twMerge(
				'h-fit border border-dark-700 rounded-lg bg-dark-700 p-4 gap-y-8 flex flex-col',
				className
			)}
		>
			<Input label='Search' onChange={(e) => handleOnChange(e.target.value)} />
			<div className='flex flex-wrap gap-4 items-start justify-around'>
				{sandpackTemplates.map((template, i) => (
					<ChooseTemplateLink
						className={twMerge(
							'w-fit grow flex justify-center py-2 h-fit border-dark-600 bg-dark-800 hover:bg-dark-900',
							selectedTemplate === template ? 'bg-dark-900 border-primary' : ''
						)}
						key={i}
						sandpackTemplate={getCheckedTemplateParam(template)}
						onClick={() => handleOnlick(template)}
						isSelected={selectedTemplate === template}
						setSelected={setSelectedTemplate}
					/>
				))}
			</div>
		</div>
	);
};
