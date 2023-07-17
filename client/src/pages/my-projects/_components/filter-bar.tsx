import Input from 'components/input';
import { TemplateButton } from 'components/template-button/template-button';
import { getCheckedTemplateParam } from 'helpers/get-cheked-template-param';
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
		setSelectedTemplate(template);
	};

	const handleOnChange = (searchText: string) => {
		console.log({ searchText });
		setInputSearch(searchText);
	};

	const { projects, setFilteredProjects } = state;

	useEffect(() => {
		// const visibleProjects = filteredProjects?.length === 0 ? projects : filteredProjects;
		if (projects === null) return;

		const projectsFileteredByTemplate = filterProjectsByTemplate(selectedTemplate, projects);

		if (selectedTemplate !== null && projectsFileteredByTemplate !== null)
			return setFilteredProjects(searchProjects(projectsFileteredByTemplate, inputSearch));

		setFilteredProjects(searchProjects(projects, inputSearch));
	}, [inputSearch, projects, selectedTemplate, setFilteredProjects]);

	useEffect(() => {
		if (projects === null || inputSearch !== '') return;
		console.log('PXXXX');
		setFilteredProjects(filterProjectsByTemplate(selectedTemplate, projects));
	}, [inputSearch, projects, selectedTemplate, setFilteredProjects]);

	return (
		<div
			className={twMerge(
				'h-fit border border-dark-700 rounded-lg bg-black p-4 gap-y-8 flex flex-col',
				className
			)}
		>
			<Input label='Search' onChange={(e) => handleOnChange(e.target.value)} />
			<div className='flex flex-wrap gap-4 items-start justify-around'>
				{sandpackTemplates.map((template, i) => (
					<TemplateButton
						className={twMerge(
							'text-sm w-fit grow flex justify-center py-2 h-fit border-dark-600 bg-dark-800 hover:bg-dark-900',
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
