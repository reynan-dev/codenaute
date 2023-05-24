import Loader from 'components/svgs/loader';
import ProjectContext from 'context/project.context';
import { useGetQueryParam } from 'hooks/use-get-query-param';
import { getCheckedTemplateParam } from 'pages/code/helpers/getCheckedTemplateParam';
import { useContext, useState } from 'react';
import { CodePage } from './code.page';

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
}

export const CodeContainer = () => {
	const { getProjectDataResult } = useContext(ProjectContext);
	const [projectName, setProjectName] = useState('untitled');
	const templateParam = useGetQueryParam('template');

	const state: ProjectState = {
		projectName,
		setProjectName
	};

	return (
		<>
			{getProjectDataResult === null ? (
				<Loader />
			) : (
				<CodePage
					// dependencies={getDependenciesFromJson(getProjectDataResult)}
					// devDependencies={getDevDependenciesFromJson(getProjectDataResult)}
					template={getCheckedTemplateParam(templateParam)}
					state={state}
				/>
			)}
		</>
	);
};
