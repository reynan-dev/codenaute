import { useMutation, useQuery } from '@apollo/client';
import { SandpackFiles } from '@codesandbox/sandpack-react/types';
import AuthContext from 'context/auth.context';
import ProjectContext from 'context/project.context';
import {
	CreateProjectMutation,
	CreateProjectMutationVariables,
	GetProjectByIdQuery,
	GetProjectByIdQueryVariables,
	UpdateProjectMutation,
	UpdateProjectMutationVariables
} from 'graphql/__generated__/graphql';
import { CREATE_PROJECT_MUTATION } from 'graphql/project/create-project.mutation';
import { GET_PROJECT_BY_ID_QUERY } from 'graphql/project/get-project-by-id.query';
import { UPDATE_PROJECT_MUTATION } from 'graphql/project/update-project.mutation';
import { getGraphQLErrorMessage } from 'helpers/get-graphql-error-message';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { ProjectContextData, SetProjectContextData } from 'types/project';

interface ProjectDataResponse {
	__typename?: 'Project';
	name: string;
	isTemplate: boolean;
	id: string;
	isPublic: boolean;
	files: string;
	owner: {
		__typename?: 'Member';
		id: string;
		sessions?: Array<{
			__typename?: 'Session';
			member: {
				__typename?: 'Member';
				sessions?: Array<{
					__typename?: 'Session';
					member: {
						__typename?: 'Member';
						id: string;
					};
				}> | null;
			};
		}> | null;
	};
	sandpackTemplate: string;
}

interface onSuccessCallbacks {
	setLastSavedProjectData: SetProjectContextData;
	setCurrentProjectData: SetProjectContextData;
}

export const onSuccess = (callbacks: onSuccessCallbacks, project: ProjectContextData) => {
	const { setLastSavedProjectData, setCurrentProjectData } = callbacks;

	console.log({ projectId: project.id });

	setLastSavedProjectData({
		id: project.id,
		name: project.name,
		sandpackTemplate: project.sandpackTemplate,
		files: typeof project.files === 'string' ? JSON.parse(project.files) : project.files
	});
	setCurrentProjectData({
		id: project.id,
		name: project.name,
		sandpackTemplate: project.sandpackTemplate,
		files: typeof project.files === 'string' ? JSON.parse(project.files) : project.files
	});
};

export const mapProjectDataResponse = (data: ProjectDataResponse) => {
	console.log(data.id);
	return {
		id: data.id,
		name: data.name,
		sandpackTemplate: data.sandpackTemplate,
		files: JSON.parse(data.files) as SandpackFiles
	};
};

export const useGetProjectService = (projectId: string | undefined) => {
	const { setCurrentProjectData, setLastSavedProjectData } = useContext(ProjectContext);

	const { loading, data, error, refetch } = useQuery<
		GetProjectByIdQuery,
		GetProjectByIdQueryVariables
	>(GET_PROJECT_BY_ID_QUERY, {
		variables: { projectId: projectId ?? '' },
		onCompleted: (data) => {
			onSuccess(
				{ setLastSavedProjectData, setCurrentProjectData },
				mapProjectDataResponse(data.getProjectById) ?? null
			);
		},
		onError: (error) => {
			console.error({ errorToCheck: error });
		}
	});

	return { loading, data, error, refetch };
};

export const useCreateProjectService = () => {
	const [createProjectMutation, { data, loading }] = useMutation<
		CreateProjectMutation,
		CreateProjectMutationVariables
	>(CREATE_PROJECT_MUTATION);

	const { profile } = useContext(AuthContext);
	const { setLastSavedProjectData, setCurrentProjectData } = useContext(ProjectContext);

	const createProject = async (project: ProjectContextData) => {
		console.log('CREATION');

		if (!profile) {
			return toast.error('An unexpected error has occurred. Please log in again and try again.', {
				autoClose: 10000
			});
		}

		await createProjectMutation({
			variables: {
				name: project.name,
				memberId: profile.profile.id,
				isTemplate: false,
				isPublic: false,
				sandpackTemplate: project.sandpackTemplate ?? '',
				files: JSON.stringify(project.files)
			},
			onCompleted(data) {
				console.log({
					ilYAunId: data ? mapProjectDataResponse(data.createProject).id : project.id
				});
				onSuccess(
					{ setLastSavedProjectData, setCurrentProjectData },
					data ? mapProjectDataResponse(data.createProject) : project
				);
			},
			onError(error) {
				toast.error(getGraphQLErrorMessage(error), { autoClose: 10000 });
			}
		});
	};

	return { data, loading, createProject };
};

export const useUpdateProjectService = () => {
	const [UpdateProjectMutation, { data, loading }] = useMutation<
		UpdateProjectMutation,
		UpdateProjectMutationVariables
	>(UPDATE_PROJECT_MUTATION);

	const { profile } = useContext(AuthContext);
	const { setLastSavedProjectData, setCurrentProjectData } = useContext(ProjectContext);

	const updateProject = async (project: ProjectContextData) => {
		console.log('UPDATE');
		console.log({ projectIdUpdate: project.id });

		if (!profile) {
			return toast.error('An unexpected error has occurred. Please log in again and try again.', {
				autoClose: 10000
			});
		}

		if (project.id === undefined) {
			return toast.error('An unexpected error has occurred. Please log in again and try again.', {
				autoClose: 10000
			});
		}

		try {
			await UpdateProjectMutation({
				variables: {
					name: project.name,
					projectId: project.id,
					isTemplate: false,
					isPublic: false,
					sandpackTemplate: project.sandpackTemplate ?? '',
					files: JSON.stringify(project.files)
				}
			});

			onSuccess({ setLastSavedProjectData, setCurrentProjectData }, project);
		} catch (error) {
			toast.error(getGraphQLErrorMessage(error), { autoClose: 10000 });
		}
	};

	return { data, loading, updateProject };
};

export const useSaveProjectService = () => {
	const { lastSavedProjectData } = useContext(ProjectContext);

	const {
		updateProject,
		data: updateProjectData,
		loading: updateProjectLoading
	} = useUpdateProjectService();

	const {
		createProject,
		data: createProjectData,
		loading: createProjectLoading
	} = useCreateProjectService();

	const saveProjectLoading = createProjectLoading || updateProjectLoading ? true : false;

	const saveProject = async (project: ProjectContextData | null) => {
		if (!project) {
			return toast.error('An unexpected error has occurred. Please log in again and try again.', {
				autoClose: 10000
			});
		}

		if (lastSavedProjectData === null) {
			return await createProject(project);
		}

		return await updateProject(project);
	};

	const saveProjectData = updateProjectData ?? createProjectData;

	return { saveProject, saveProjectLoading, saveProjectData };
};
