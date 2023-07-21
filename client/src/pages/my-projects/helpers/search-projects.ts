import { ProjectState } from 'pages/my-projects/my-projects.service';

const getProjectWithKeywordIncluded = (project: ProjectState, keywords: string[]) => {
	const searchable = [project.name]
		.filter((element): element is string => element !== null)
		.map((element) => element.toLowerCase())
		.join(' ');

	return keywords.every((keyword) => searchable.includes(keyword));
};

export const searchProjects = (projects: ProjectState[], searchText: string): ProjectState[] => {
	if (searchText === '') return projects;
	console.log('search');

	const keywords = searchText.toLowerCase().trim().split(' ');

	return projects.filter((project) => getProjectWithKeywordIncluded(project, keywords));
};
