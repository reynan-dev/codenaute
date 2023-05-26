import ProjectContext from 'context/project.context';
import { useContext } from 'react';
import { CodePage } from './code.page';
import { ProjectContextData } from 'types/project';
import Loader from 'components/svgs/loader';
import { useParams } from 'react-router-dom';
import { useGetProjectService } from 'pages/code/code.service';

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

	return <>{loading ? <Loader /> : <CodePage state={state} />}</>;
};
