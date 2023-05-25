import ProjectContext from 'context/project.context';
import { getCheckedTemplateParam } from 'pages/code/helpers/getCheckedTemplateParam';
import { useContext } from 'react';
import { CodePage } from './code.page';
import { ProjectContextData } from 'types/project';

export type Dependencies = Record<string, string>;

// const getDependenciesFromJson = (projectData: Project): Dependencies => {
// 	return JSON.parse(projectData.files.filter((e) => e.name === '/package.json')[0].code)
// 		.dependencies;
// };

// const getDevDependenciesFromJson = (projectData: Project): Dependencies => {
// 	return JSON.parse(projectData.files.filter((e) => e.name === '/package.json')[0].code)
// 		.devDependencies;
// };

export interface ProjectState {
	projectName: string;
	setProjectName: React.Dispatch<React.SetStateAction<string>>;
	currentProjectData: ProjectContextData | null;
}

export const CodeContainer = () => {
	// const { getProjectDataResult } = useContext(ProjectContext);
	const { templateParam, projectName, setProjectName, currentProjectData } =
		useContext(ProjectContext);

	const state: ProjectState = {
		projectName,
		setProjectName,
		currentProjectData
	};

	return (
		// <>
		// 	{getProjectDataResult === null ? (
		// 		<Loader />
		// 	) : (
		<CodePage
			// dependencies={getDependenciesFromJson(getProjectDataResult)}
			// devDependencies={getDevDependenciesFromJson(getProjectDataResult)}
			template={getCheckedTemplateParam(templateParam)}
			state={state}
		/>
		// 	)}
		// </>
	);
};
