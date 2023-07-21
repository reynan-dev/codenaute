import Input from 'components/input';
import { TemplateButton } from 'components/template-button/template-button';
import { getCheckedTemplateParam } from 'helpers/get-cheked-template-param';
import { filterProjectsByTemplate } from 'pages/my-projects/helpers/filter-projects-by-template';
import { searchProjects } from 'pages/my-projects/helpers/search-projects';
import { ProjectsPageState } from 'pages/my-projects/my-projects.container';
import { useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { SandpackTemplatesEnum } from 'types/sandpack';

interface FilterBarProps {
	className?: string;
	state: ProjectsPageState;
}

export const FilterBar = ({ className, state }: FilterBarProps) => {
	const sandpackTemplates = Object.values(SandpackTemplatesEnum);

	const handleOnlick = (template: SandpackTemplatesEnum) => {
		state.setSelectedTemplate(template);
	};

	const handleOnChange = (searchText: string) => {
		console.log({ searchText });
		state.setInputSearch(searchText);
	};

	const { projects, setFilteredProjects } = state;

	useEffect(() => {
		if (projects === null) return;

		const projectsFileteredByTemplate = filterProjectsByTemplate(state.selectedTemplate, projects);

		if (state.selectedTemplate !== null && projectsFileteredByTemplate !== null)
			return setFilteredProjects(searchProjects(projectsFileteredByTemplate, state.inputSearch));

		setFilteredProjects(searchProjects(projects, state.inputSearch));
	}, [projects, setFilteredProjects, state.inputSearch, state.selectedTemplate]);

	useEffect(() => {
		if (projects === null || state.inputSearch !== '') return;
		console.log('PXXXX');
		setFilteredProjects(filterProjectsByTemplate(state.selectedTemplate, projects));
	}, [projects, setFilteredProjects, state.inputSearch, state.selectedTemplate]);

	return (
		<div
			className={twMerge(
				'flex flex-col',
				'h-fit p-4 gap-y-8',
				'rounded-lg ',
				'border border-dark-700 bg-black',
				className
			)}
		>
			<Input label='Search' onChange={(e) => handleOnChange(e.target.value)} />
			<div className='flex flex-wrap gap-4 items-start justify-around'>
				{sandpackTemplates.map((template, i) => (
					<TemplateButton
						className={twMerge(
							'flex justify-center',
							'w-fit py-2 grow h-fit',
							'text-sm border-dark-600 bg-dark-800',
							'hover:bg-dark-900',
							state.selectedTemplate === template ? 'bg-dark-900 border-primary' : ''
						)}
						key={i}
						sandpackTemplate={getCheckedTemplateParam(template)}
						onClick={() => handleOnlick(template)}
						isSelected={state.selectedTemplate === template}
						setSelected={state.setSelectedTemplate}
					/>
				))}
			</div>
		</div>
	);
};
