import { createContext, ReactNode, useEffect, useState } from 'react';
import { Project } from 'fixtures/projects-fixtures';
import { useCreateProject } from 'api/project/use-project';

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

	useCreateProject(setProjectData);

	return (
		<ProjectContext.Provider value={{ projectData, setProjectData }}>
			{children}
		</ProjectContext.Provider>
	);
};

export default ProjectContext;
