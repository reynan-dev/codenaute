import Loader from 'components/svgs/loader';
import { MyProjectsPage } from 'pages/my-projects/my-projects.page';
import {
	ProjectState,
	useGetAllProjectsByOwnerService
} from 'pages/my-projects/my-projects.service';
import { useState } from 'react';

export const MyProjectsContainer = () => {
	const [projects, setProjects] = useState<ProjectState[] | null>(null);

	const { loading } = useGetAllProjectsByOwnerService(setProjects);

	return <>{loading ? <Loader /> : <MyProjectsPage projects={projects} />}</>;
};
