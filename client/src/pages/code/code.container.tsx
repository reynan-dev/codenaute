import { SandpackFiles } from '@codesandbox/sandpack-react';
import { SandpackFile } from '@codesandbox/sandpack-react/types';
import Loader from 'components/svgs/loader';
import ProjectContext from 'context/project.context';
import { Files, Project, projectFixtures } from 'fixtures/projects-fixtures';
import { useGetQueryParam } from 'hooks/use-get-query-param';
import { getCheckedTemplateParam } from 'pages/code/helpers/getCheckedTemplateParam';
import { useContext, useState } from 'react';
import { CodePage } from './code.page';

export type Dependencies = Record<string, string>;

const getDependenciesFromJson = (projectData: Project): Dependencies => {
	return JSON.parse(projectData.files.filter((e) => e.name === '/package.json')[0].code)
		.dependencies;
};

const getDevDependenciesFromJson = (projectData: Project): Dependencies => {
	return JSON.parse(projectData.files.filter((e) => e.name === '/package.json')[0].code)
		.devDependencies;
};

const mapFilesForSandpack = (files: Files) => {
	let filesObject: Record<string, string | SandpackFile> = {};

	files.map((e) => {
		return e.name && (filesObject[e.name] = `${e.code}`);
	});

	return filesObject;
};

export interface ProjectState {
	projectName: string;
	setProjectName: React.Dispatch<React.SetStateAction<string>>;
	files: SandpackFiles | null;
	setFiles: React.Dispatch<React.SetStateAction<SandpackFiles | null>>;
	isProjectSaved: boolean;
	setIsProjectSaved: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CodeContainer = () => {
	const { projectData } = useContext(ProjectContext);
	const [projectName, setProjectName] = useState('untitled');
	const [files, setFiles] = useState<SandpackFiles | null>(null);
	const [isProjectSaved, setIsProjectSaved] = useState(false);
	const templateParam = useGetQueryParam('template');

	const state: ProjectState = {
		projectName,
		setProjectName,
		files,
		setFiles,
		isProjectSaved,
		setIsProjectSaved
	};

	return (
		<>
			{projectData === null ? (
				<Loader />
			) : (
				<CodePage
					mappedFilesForSandpack={mapFilesForSandpack(projectFixtures.files)}
					dependencies={getDependenciesFromJson(projectData)}
					devDependencies={getDevDependenciesFromJson(projectData)}
					template={getCheckedTemplateParam(templateParam)}
					state={state}
				/>
			)}
		</>
	);
};
