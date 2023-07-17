import { ProjectState } from 'pages/my-projects/my-projects.service';
import { SandpackTemplate } from 'types/sandpack';

export const filterProjectsByTemplate = (
	sandpackTemplate: SandpackTemplate | undefined,
	projects: ProjectState[]
) => {
	if (sandpackTemplate === undefined || projects === null) return null;
	return projects?.filter((project) => project.sandpackTemplate === sandpackTemplate);
};
