import { useQuery } from '@apollo/client';
import {
	GetAllPublicProjectsQuery,
	GetAllPublicProjectsQueryVariables
} from 'gql/__generated__/graphql';
import { GET_ALL_PUBLIC_PROJECTS } from 'screens/last-projects/last-projects.graphql';

type ProjectDataResponse = {
	__typename?: 'Project';
	files: string;
	main: string;
	sandpackTemplate: string;
	name: string;
	id: string;
	owner: {
		__typename?: 'Member';
		email: string;
		id: string;
		username: string;
	};
};

export const useGetAllPublicProjects = () =>
	// setProjects: React.Dispatch<React.SetStateAction<ProjectState[] | null>>
	{
		const { loading, data, error, refetch } = useQuery<
			GetAllPublicProjectsQuery,
			GetAllPublicProjectsQueryVariables
		>(GET_ALL_PUBLIC_PROJECTS, {
			onCompleted: (data) => {
				console.log({ data });
			},
			onError: (error) => {
				console.log({ error });
			}
		});

		return { loading, data, error, refetch };
	};
