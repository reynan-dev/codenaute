import { ProjectState } from 'pages/my-projects/my-projects.service';
import { SandpackTemplate } from 'types/sandpack';

export const filterProjectsByTemplate = (
	sandpackTemplate: SandpackTemplate | undefined | null,
	projects: ProjectState[]
) => {
	if (sandpackTemplate === undefined || projects === null) return null;
	if (sandpackTemplate === null) return projects;
	return projects?.filter((project) => project.sandpackTemplate === sandpackTemplate);
};
