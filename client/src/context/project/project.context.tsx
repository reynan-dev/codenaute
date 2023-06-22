import { SandpackFiles } from '@codesandbox/sandpack-react/types';
import { hasSandpackFilesChanged } from 'helpers/has-sandpack-files-changed';
import { ReactNode, createContext, useEffect, useState } from 'react';
import { ProjectContextData, SetProjectContextData } from 'types/project';

export interface ProjectContextProps {
	lastSavedProjectData: ProjectContextData | null;
	setLastSavedProjectData: SetProjectContextData;
	currentProjectData: ProjectContextData | null;
	setCurrentProjectData: SetProjectContextData;
	isProjectSaved: boolean;
	setIsProjectSaved: React.Dispatch<React.SetStateAction<boolean>>;
	files: SandpackFiles | null;
	setFiles: React.Dispatch<React.SetStateAction<SandpackFiles | null>>;
	projectName: string;
	setProjectName: React.Dispatch<React.SetStateAction<string>>;
}

export const ProjectContext = createContext<ProjectContextProps>({
	lastSavedProjectData: null,
	setLastSavedProjectData: () => null,
	currentProjectData: null,
	setCurrentProjectData: () => null,
	isProjectSaved: false,
	setIsProjectSaved: () => null,
	files: null,
	setFiles: () => null,
	projectName: 'untitled',
	setProjectName: () => 'untitled'
});

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
	const [lastSavedProjectData, setLastSavedProjectData] = useState<ProjectContextData | null>(null);
	const [currentProjectData, setCurrentProjectData] = useState<ProjectContextData | null>(null);
	const [isProjectSaved, setIsProjectSaved] = useState(false);
	const [files, setFiles] = useState<SandpackFiles | null>(null);
	const [projectName, setProjectName] = useState('untitled');

	useEffect(() => {
		if (lastSavedProjectData?.files !== undefined && currentProjectData?.files !== undefined) {
			const hasProjectNameChanged = currentProjectData?.name !== lastSavedProjectData?.name;

			setIsProjectSaved(
				!hasSandpackFilesChanged(lastSavedProjectData?.files, currentProjectData?.files) &&
					!hasProjectNameChanged
			);
		}
	}, [currentProjectData, lastSavedProjectData]);

	useEffect(() => {
		if (files) {
			const project = {
				id: lastSavedProjectData?.id,
				sandpackTemplate: lastSavedProjectData?.sandpackTemplate,
				name: projectName,
				files
			};
			setCurrentProjectData(project);
		}
	}, [files, projectName, lastSavedProjectData]);

	return (
		<ProjectContext.Provider
			value={{
				lastSavedProjectData,
				setLastSavedProjectData,
				currentProjectData,
				setCurrentProjectData,
				isProjectSaved,
				setIsProjectSaved,
				files,
				setFiles,
				projectName,
				setProjectName
			}}
		>
			{children}
		</ProjectContext.Provider>
	);
};

export default ProjectContext;
