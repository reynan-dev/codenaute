import { useQuery } from '@apollo/client';
import {
	GetAllPublicProjectsQuery,
	GetAllPublicProjectsQueryVariables
} from 'gql/__generated__/graphql';
import { GET_ALL_PUBLIC_PROJECTS } from 'screens/last-projects/last-projects.graphql';
import { SandpackFiles } from 'types/project';
import { SetState } from 'types/react';

type ProjectDataResponse = {
	__typename?: 'Project';
	id: string;
	files: string;
	isTemplate: boolean;
	mainFile: string;
	name: string;
	createdAt: any;
	environment: string;
	sandpackTemplate: string;
	owner: { __typename?: 'Member'; username: string };
};

export type ProjectState = {
	id: string;
	name: string;
	sandpackTemplate: string;
	files: SandpackFiles;
	mainFile: string;
	ownerUsername: string;
	createdAt: string;
};

export const mapProjectDataResponse = (data: ProjectDataResponse) => {
	return {
		id: data.id,
		name: data.name,
		sandpackTemplate: data.sandpackTemplate,
		files: JSON.parse(data.files) as SandpackFiles,
		mainFile: data.mainFile,
		ownerUsername: data.owner.username,
		createdAt: data.createdAt
	};
};

const sortByCreatedAtDesc = (projects: ProjectState[]): ProjectState[] => {
	return projects.slice().sort((a, b) => {
		const dateA = new Date(a.createdAt);
		const dateB = new Date(b.createdAt);

		if (dateA > dateB) {
			return -1;
		} else if (dateA < dateB) {
			return 1;
		}

		return 0;
	});
};

export const useGetAllPublicProjects = (setProjects: SetState<ProjectState[] | null>) => {
	const { loading, data, error, refetch } = useQuery<
		GetAllPublicProjectsQuery,
		GetAllPublicProjectsQueryVariables
	>(GET_ALL_PUBLIC_PROJECTS, {
		onCompleted: (data) => {
			console.log({ data });
			const mappedProjects = data.getAllPublicProjects.map((project) =>
				mapProjectDataResponse(project)
			);

			setProjects(sortByCreatedAtDesc(mappedProjects));
		},
		onError: (error) => {
			console.log({ error });
		}
	});

	return { loading, data, error, refetch };
};
