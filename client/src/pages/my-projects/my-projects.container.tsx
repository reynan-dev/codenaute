import Loader from 'components/svgs/loader';
import { MyProjectsPage } from 'pages/my-projects/my-projects.page';
import {
	ProjectState,
	useGetAllProjectsByOwnerService
} from 'pages/my-projects/my-projects.service';
import { useEffect, useState } from 'react';
import { SandpackTemplate } from 'types/sandpack';

export const MyProjectsContainer = () => {
	const [projects, setProjects] = useState<ProjectState[] | null>(null);
	const [filteredProjects, setFilteredProjects] = useState<ProjectState[] | null>(projects);

	useEffect(() => {
		setFilteredProjects(projects);
	}, [projects]);

	const filterProjectsByTemplate = (sandpackTemplate: SandpackTemplate | undefined) => {
		if (sandpackTemplate === undefined || projects === null) return null;
		return projects?.filter((project) => project.sandpackTemplate === sandpackTemplate);
	};

	const { loading } = useGetAllProjectsByOwnerService(setProjects);

	const onFilterProjects = (sandpackTemplate: SandpackTemplate | undefined) => {
		setFilteredProjects(filterProjectsByTemplate(sandpackTemplate));
	};

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<MyProjectsPage filteredProjects={filteredProjects} onFilterProjects={onFilterProjects} />
			)}
		</>
	);
};
