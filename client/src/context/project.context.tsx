import { createContext, ReactNode, useEffect, useState } from 'react';
import { useProject } from 'api/project/use-project';
import { Project } from 'fixtures/projects-fixtures';

export interface ProjectContextProps {
	projectData: Project | null;
	setProjectData: React.Dispatch<React.SetStateAction<Project | null>>;
}

export const ProjectContext = createContext<ProjectContextProps>({
	projectData: null,
	setProjectData: () => null
});

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
	const [projectData, setProjectData] = useState<Project | null>(null);

	useProject(setProjectData);

	return (
		<ProjectContext.Provider value={{ projectData, setProjectData }}>
			{children}
		</ProjectContext.Provider>
	);
};

export default ProjectContext;
