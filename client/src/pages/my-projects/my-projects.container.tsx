import Loader from 'components/svgs/loader';
import { MyProjectsPage } from 'pages/my-projects/my-projects.page';
import {
	ProjectState,
	useGetAllProjectsByOwnerService
} from 'pages/my-projects/my-projects.service';
import { useEffect, useState } from 'react';
import { SandpackTemplate } from 'types/sandpack';

export interface ProjectsPageState {
	projects: ProjectState[] | null;
	setProjects: React.Dispatch<React.SetStateAction<ProjectState[] | null>>;
	filteredProjects: ProjectState[] | null;
	setFilteredProjects: React.Dispatch<React.SetStateAction<ProjectState[] | null>>;
	selectedTemplate: SandpackTemplate | null;
	setSelectedTemplate: React.Dispatch<React.SetStateAction<SandpackTemplate | null>>;
	inputSearch: string;
	setInputSearch: React.Dispatch<React.SetStateAction<string>>;
	isModalOpen: boolean;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MyProjectsContainer = () => {
	const [projects, setProjects] = useState<ProjectState[] | null>(null);
	const [filteredProjects, setFilteredProjects] = useState<ProjectState[] | null>(null);
	const [selectedTemplate, setSelectedTemplate] = useState<SandpackTemplate | null>(null);
	const [inputSearch, setInputSearch] = useState<string>('');
	const [isModalOpen, setIsModalOpen] = useState(false);

	const state: ProjectsPageState = {
		projects,
		setProjects,
		filteredProjects,
		setFilteredProjects,
		selectedTemplate,
		setSelectedTemplate,
		inputSearch,
		setInputSearch,
		isModalOpen,
		setIsModalOpen
	};

	useEffect(() => {
		setFilteredProjects(projects);
	}, [projects]);

	const { loading } = useGetAllProjectsByOwnerService(setProjects);

	return <>{loading ? <Loader /> : <MyProjectsPage state={state} />}</>;
};
