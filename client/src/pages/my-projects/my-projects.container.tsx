import Loader from 'components/svgs/loader';
import { MyProjectsPage } from 'pages/my-projects/my-projects.page';
import {
	ProjectState,
	useGetAllProjectsByOwnerService
} from 'pages/my-projects/my-projects.service';
import { useEffect, useState } from 'react';

export interface ProjectsPageState {
	projects: ProjectState[] | null;
	setProjects: React.Dispatch<React.SetStateAction<ProjectState[] | null>>;
	filteredProjects: ProjectState[] | null;
	setFilteredProjects: React.Dispatch<React.SetStateAction<ProjectState[] | null>>;
}

export const MyProjectsContainer = () => {
	const [projects, setProjects] = useState<ProjectState[] | null>(null);
	const [filteredProjects, setFilteredProjects] = useState<ProjectState[] | null>(null);

	const state: ProjectsPageState = {
		projects,
		setProjects,
		filteredProjects,
		setFilteredProjects
	};

	useEffect(() => {
		setFilteredProjects(projects);
	}, [projects]);

	const { loading } = useGetAllProjectsByOwnerService(setProjects);

	return <>{loading ? <Loader /> : <MyProjectsPage state={state} />}</>;
};
