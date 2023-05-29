import Loader from 'components/svgs/loader';
import { useAutoSaveProject, useGetProjectService } from 'pages/code/code.service';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ProjectContextData } from 'types/project';
import { CodePage } from './code.page';
import ProjectContext from 'context/project/project.context';

export type Dependencies = Record<string, string>;
export interface ProjectState {
	projectName: string;
	setProjectName: React.Dispatch<React.SetStateAction<string>>;
	currentProjectData: ProjectContextData | null;
	autoSaveLoading: boolean;
}

export const CodeContainer = () => {
	const { projectName, setProjectName, currentProjectData } = useContext(ProjectContext);
	const { loading } = useGetProjectService(useParams().projectId ?? '');
	const { autoSaveLoading } = useAutoSaveProject();

	const state: ProjectState = {
		projectName,
		setProjectName,
		currentProjectData,
		autoSaveLoading
	};

	return <>{loading ? <Loader /> : <CodePage state={state} />}</>;
};
