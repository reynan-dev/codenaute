import { SandpackFiles } from '@codesandbox/sandpack-react/types';
import { useGetQueryParam } from 'hooks/use-get-query-param';
import { ReactNode, createContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProjectContextData, SetProjectContextData } from 'types/project';

export interface ProjectContextProps {
	lastSavedProjectData: ProjectContextData | null;
	setLastSavedProjectData: SetProjectContextData;
	currentProjectData: ProjectContextData | null;
	setCurrentProjectData: SetProjectContextData;
	isProjectSaved: boolean;
	setIsProjectSaved: React.Dispatch<React.SetStateAction<boolean>>;
	templateParam: string | null;
	files: SandpackFiles | null;
	setFiles: React.Dispatch<React.SetStateAction<SandpackFiles | null>>;
	projectName: string;
	setProjectName: React.Dispatch<React.SetStateAction<string>>;
	// projectIdParam: string | undefined;
	// setProjectIdParam: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const ProjectContext = createContext<ProjectContextProps>({
	lastSavedProjectData: null,
	setLastSavedProjectData: () => null,
	currentProjectData: null,
	setCurrentProjectData: () => null,
	isProjectSaved: false,
	setIsProjectSaved: () => null,
	templateParam: null,
	files: null,
	setFiles: () => null,
	projectName: 'untitled',
	setProjectName: () => 'untitled'
	// projectIdParam: undefined,
	// setProjectIdParam: () => undefined
});

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
	const [lastSavedProjectData, setLastSavedProjectData] = useState<ProjectContextData | null>(null);
	const [currentProjectData, setCurrentProjectData] = useState<ProjectContextData | null>(null);
	const [isProjectSaved, setIsProjectSaved] = useState(false);
	const [templateParam, setTemplateParam] = useState<string | null>(null);
	const [files, setFiles] = useState<SandpackFiles | null>(null);
	const [projectName, setProjectName] = useState('untitled');

	const _templateParam = useGetQueryParam('template');
	const _projectIdParam = useParams().projectId;

	useEffect(() => {
		setTemplateParam(_templateParam);
	}, [_projectIdParam, _templateParam]);

	useEffect(() => {
		const hasFilesChanged =
			JSON.stringify(currentProjectData?.files) !== JSON.stringify(lastSavedProjectData?.files);
		const hasProjectNameChanged = currentProjectData?.name !== lastSavedProjectData?.name;

		setIsProjectSaved(!hasFilesChanged && !hasProjectNameChanged);
	}, [currentProjectData, lastSavedProjectData]);

	useEffect(() => {
		console.log({ isProjectSaved });
	}, [isProjectSaved]);

	useEffect(() => {
		console.log({ currentProjectData });
	}, [currentProjectData]);

	useEffect(() => {
		if (templateParam && files) {
			const project = {
				id: lastSavedProjectData?.id,
				sandpackTemplate: templateParam,
				name: projectName,
				files
			};
			console.log({ projectToSend: project });
			setCurrentProjectData(project);
		}
	}, [files, projectName, templateParam, lastSavedProjectData]);

	return (
		<ProjectContext.Provider
			value={{
				lastSavedProjectData,
				setLastSavedProjectData,
				currentProjectData,
				setCurrentProjectData,
				isProjectSaved,
				setIsProjectSaved,
				templateParam,
				files,
				setFiles,
				projectName,
				setProjectName
				// projectIdParam,
				// setProjectIdParam
			}}
		>
			{children}
		</ProjectContext.Provider>
	);
};

export default ProjectContext;
