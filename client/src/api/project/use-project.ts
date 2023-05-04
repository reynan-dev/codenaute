import { Project, projectFixtures } from 'fixtures/projects-fixtures';
import { useEffect } from 'react';

export const useProject = (
	setProjectData: React.Dispatch<React.SetStateAction<Project | null>>
) => {
	useEffect(() => {
		setProjectData(projectFixtures);
	}, []);
};
