import { useQuery } from '@apollo/client';
import { SandpackFiles } from '@codesandbox/sandpack-react/types';
import {
	GetAllProjectsByOwnerQuery,
	GetAllProjectsByOwnerQueryVariables
} from 'graphql/__generated__/graphql';

import { getGraphQLErrorMessage } from 'helpers/get-graphql-error-message';
import { GET_ALL_PROJECTS_BY_OWNER } from 'pages/my-projects/my-projects.graphql';
import { toast } from 'react-toastify';

export type ProjectState = {
	id: string;
	name: string;
	sandpackTemplate: string;
	files: SandpackFiles;
	mainFile: string;
	ownerUsername: string;
};

type ProjectDataResponse = {
	__typename?: 'Project';
	files: string;
	mainFile: string;
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

export const mapProjectDataResponse = (data: ProjectDataResponse) => {
	return {
		id: data.id,
		name: data.name,
		sandpackTemplate: data.sandpackTemplate,
		files: JSON.parse(data.files) as SandpackFiles,
		mainFile: data.mainFile,
		ownerUsername: data.owner.username
	};
};

export const useGetAllProjectsByOwnerService = (
	setProjects: React.Dispatch<React.SetStateAction<ProjectState[] | null>>
) => {
	const { loading, data, error, refetch } = useQuery<
		GetAllProjectsByOwnerQuery,
		GetAllProjectsByOwnerQueryVariables
	>(GET_ALL_PROJECTS_BY_OWNER, {
		onCompleted: (data) => {
			const mappedProjects = data.getAllProjectsByOwner.map((project) =>
				mapProjectDataResponse(project)
			);

			setProjects(mappedProjects);
		},
		onError: (error) => {
			toast.error(getGraphQLErrorMessage(error), { autoClose: 10000 });
		}
	});

	return { loading, data, error, refetch };
};
