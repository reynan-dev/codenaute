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
	main: string;
	name: string;
	environment: string;
	sandpackTemplate: string;
	owner: { __typename?: 'Member'; username: string };
};

// export type GetAllPublicProjectsQuery = {
// 	__typename?: 'Query';
// 	getAllPublicProjects: Array<{
// 		__typename?: 'Project';
// 		id: string;
// 		files: string;
// 		isTemplate: boolean;
// 		main: string;
// 		name: string;
// 		environment: string;
// 		sandpackTemplate: string;
// 		owner: { __typename?: 'Member'; username: string };
// 	}>;
// };

export type ProjectState = {
	id: string;
	name: string;
	sandpackTemplate: string;
	files: SandpackFiles;
	main: string;
	ownerUsername: string;
};

export const mapProjectDataResponse = (data: ProjectDataResponse) => {
	return {
		id: data.id,
		name: data.name,
		sandpackTemplate: data.sandpackTemplate,
		files: JSON.parse(data.files) as SandpackFiles,
		main: data.main,
		ownerUsername: data.owner.username
	};
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

			setProjects(mappedProjects);
		},
		onError: (error) => {
			console.log({ error });
		}
	});

	return { loading, data, error, refetch };
};
