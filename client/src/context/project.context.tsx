import { Project, projectFixtures } from 'fixtures/projects-fixtures';
import { ReactNode, createContext, useEffect, useState } from 'react';

export interface ProjectContextProps {
	lastSavedProjectData: Partial<Project> | null;
	setLastSavedProjectData: React.Dispatch<React.SetStateAction<Partial<Project> | null>>;
	currentProjectData: Partial<Project> | null;
	setCurrentProjectData: React.Dispatch<React.SetStateAction<Partial<Project> | null>>;
	getProjectDataResult: Project | null;
	setGetProjectDataResult: React.Dispatch<React.SetStateAction<Project | null>>;
	isProjectSaved: boolean;
	setIsProjectSaved: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ProjectContext = createContext<ProjectContextProps>({
	lastSavedProjectData: null,
	setLastSavedProjectData: () => null,
	currentProjectData: null,
	setCurrentProjectData: () => null,
	getProjectDataResult: null,
	setGetProjectDataResult: () => null,
	isProjectSaved: false,
	setIsProjectSaved: () => null
});

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
	const [lastSavedProjectData, setLastSavedProjectData] = useState<
		Partial<Project> | Project | null
	>(null);
	const [currentProjectData, setCurrentProjectData] = useState<Partial<Project> | null>(null);
	const [getProjectDataResult, setGetProjectDataResult] = useState<Project | null>(null);
	const [isProjectSaved, setIsProjectSaved] = useState(false);

	useEffect(() => {
		setGetProjectDataResult(projectFixtures);
	}, [setGetProjectDataResult]);

	useEffect(() => {
		setIsProjectSaved(JSON.stringify(currentProjectData) === JSON.stringify(lastSavedProjectData));
	}, [currentProjectData, lastSavedProjectData]);

	return (
		<ProjectContext.Provider
			value={{
				lastSavedProjectData,
				setLastSavedProjectData,
				currentProjectData,
				setCurrentProjectData,
				isProjectSaved,
				setIsProjectSaved,
				getProjectDataResult,
				setGetProjectDataResult
			}}
		>
			{children}
		</ProjectContext.Provider>
	);
};

export default ProjectContext;
