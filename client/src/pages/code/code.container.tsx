import Loader from 'components/svgs/loader';
import ProjectContext from 'context/project.context';
import {
	useAutoSaveProject,
	useGetProjectService,
	useUpdateProjectService
} from 'pages/code/code.service';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ProjectContextData } from 'types/project';
import { CodePage } from './code.page';

export type Dependencies = Record<string, string>;
export interface ProjectState {
	projectName: string;
	setProjectName: React.Dispatch<React.SetStateAction<string>>;
	currentProjectData: ProjectContextData | null;
}

export const CodeContainer = () => {
	const { projectName, setProjectName, currentProjectData } = useContext(ProjectContext);

	const state: ProjectState = {
		projectName,
		setProjectName,
		currentProjectData
	};

	const { loading } = useGetProjectService(useParams().projectId ?? '');
	const { updateProject } = useUpdateProjectService();

	// const consoleLog = () => (console.log('prout'))

	useAutoSaveProject();

	return <>{loading ? <Loader /> : <CodePage state={state} />}</>;
};
