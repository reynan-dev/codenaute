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
	activeFile: string;
	setActiveFile: React.Dispatch<React.SetStateAction<string>>;
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
	projectName: 'untitled',
	setProjectName: () => 'untitled',
	activeFile: 'App.tsx',
	setActiveFile: () => 'App.tsx'
});

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
	const [lastSavedProjectData, setLastSavedProjectData] = useState<ProjectContextData | null>(null);
	const [currentProjectData, setCurrentProjectData] = useState<ProjectContextData | null>(null);
	const [isProjectSaved, setIsProjectSaved] = useState(false);
	const [activeFile, setActiveFile] = useState('App.tsx');
	const [projectName, setProjectName] = useState('untitled');

	useEffect(() => {
		if (lastSavedProjectData?.files !== undefined && currentProjectData?.files !== undefined) {
			const hasProjectNameChanged = currentProjectData?.name !== lastSavedProjectData?.name;

			setIsProjectSaved(
				!hasSandpackFilesChanged(lastSavedProjectData?.files, currentProjectData?.files) &&
					!hasProjectNameChanged
			);
		}
		console.log('prout');
	}, [currentProjectData, lastSavedProjectData]);

	useEffect(() => {
		setCurrentProjectData(
			(previousState) =>
				({
					id: previousState?.id,
					sandpackTemplate: previousState?.sandpackTemplate,
					name: projectName,
					files: previousState?.files,
					environment: previousState?.environment
				} as ProjectContextData)
		);
	}, [projectName]);

	return (
		<ProjectContext.Provider
			value={{
				lastSavedProjectData,
				setLastSavedProjectData,
				currentProjectData,
				setCurrentProjectData,
				isProjectSaved,
				setIsProjectSaved,
				projectName,
				setProjectName,
				activeFile,
				setActiveFile
			}}
		>
			{children}
		</ProjectContext.Provider>
	);
};

export default ProjectContext;