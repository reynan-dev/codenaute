import { useMutation, useQuery } from '@apollo/client';
import { SandpackFiles } from '@codesandbox/sandpack-react/types';
import AuthContext from 'context/auth/auth.context';
import ProjectContext from 'context/project/project.context';
import {
	GetProjectByIdQuery,
	GetProjectByIdQueryVariables,
	UpdateProjectMutation,
	UpdateProjectMutationVariables
} from 'graphql/__generated__/graphql';
import { getGraphQLErrorMessage } from 'helpers/get-graphql-error-message';
import useDebounce from 'hooks/use-debounce';
import { GET_PROJECT_BY_ID_QUERY, UPDATE_PROJECT_MUTATION } from 'pages/code/code.graphql';
import { useCallback, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { ProjectContextData, SetProjectContextData } from 'types/project';

interface ProjectDataResponse {
	__typename?: 'Project';
	name: string;
	id: string;
	isPublic: boolean;
	files: string;
	owner: {
		__typename?: 'Member';
		id: string;
	};
	sandpackTemplate: string;
	environment: string;
	mainFile: string;
}

interface onSuccessCallbacks {
	setLastSavedProjectData: SetProjectContextData;
	setCurrentProjectData: SetProjectContextData;
}

export const onSuccess = (callbacks: onSuccessCallbacks, project: ProjectContextData) => {
	const { setLastSavedProjectData, setCurrentProjectData } = callbacks;

	setLastSavedProjectData({
		id: project.id,
		name: project.name,
		sandpackTemplate: project.sandpackTemplate,
		files: typeof project.files === 'string' ? JSON.parse(project.files) : project.files,
		environment: project.environment,
		mainFile: project.mainFile,
		isPublic: project.isPublic
	});
	setCurrentProjectData({
		id: project.id,
		name: project.name,
		sandpackTemplate: project.sandpackTemplate,
		files: typeof project.files === 'string' ? JSON.parse(project.files) : project.files,
		environment: project.environment,
		mainFile: project.mainFile,
		isPublic: project.isPublic
	});
};

export const mapProjectDataResponse = (data: ProjectDataResponse) => {
	return {
		id: data.id,
		name: data.name,
		sandpackTemplate: data.sandpackTemplate,
		files: JSON.parse(data.files) as SandpackFiles,
		environment: data.environment,
		mainFile: data.mainFile,
		isPublic: data.isPublic
	};
};

export const useGetProjectService = (projectId: string) => {
	const { setCurrentProjectData, setLastSavedProjectData, setActiveFile } =
		useContext(ProjectContext);

	const { loading, data, error, refetch } = useQuery<
		GetProjectByIdQuery,
		GetProjectByIdQueryVariables
	>(GET_PROJECT_BY_ID_QUERY, {
		variables: { projectId: projectId },
		onCompleted: (data) => {
			onSuccess(
				{ setLastSavedProjectData, setCurrentProjectData },
				mapProjectDataResponse(data.getProjectById)
			);
			setActiveFile(data.getProjectById.mainFile);
		},
		onError: (error) => {
			toast.error(getGraphQLErrorMessage(error), { autoClose: 10000 });
		}
	});

	return { loading, data, error, refetch };
};

export const useUpdateProjectService = () => {
	const [UpdateProjectMutation, { data, loading }] = useMutation<
		UpdateProjectMutation,
		UpdateProjectMutationVariables
	>(UPDATE_PROJECT_MUTATION);

	const { profile } = useContext(AuthContext);
	const {
		setLastSavedProjectData,
		setCurrentProjectData,
		visibleFiles,
		setVisibleFiles,
		setActiveFile,
		activeFile
	} = useContext(ProjectContext);

	const updateProject = useCallback(
		async (project: ProjectContextData | null) => {
			if (!profile) {
				return toast.error('An unexpected error has occurred. Please log in again and try again.', {
					autoClose: 10000
				});
			}

			if (project?.id === undefined) {
				return toast.error('An unexpected error has occurred. Please log in again and try again.', {
					autoClose: 10000
				});
			}

			await UpdateProjectMutation({
				variables: {
					name: project.name,
					projectId: project.id,
					isPublic: project.isPublic,
					sandpackTemplate: project.sandpackTemplate ?? '',
					files: JSON.stringify(project.files),
					environment: project.environment,
					mainFile: project.mainFile
				},
				onCompleted(data) {
					onSuccess(
						{ setLastSavedProjectData, setCurrentProjectData },
						mapProjectDataResponse(data.updateProject)
					);
					setVisibleFiles(visibleFiles);
					setActiveFile(activeFile);
				},
				onError(error) {
					toast.error(getGraphQLErrorMessage(error), { autoClose: 10000 });
				}
			});
		},
		[
			UpdateProjectMutation,
			activeFile,
			profile,
			setActiveFile,
			setCurrentProjectData,
			setLastSavedProjectData,
			setVisibleFiles,
			visibleFiles
		]
	);

	return { data, loading, updateProject };
};

export const useAutoSaveProject = () => {
	const AUTO_SAVE_DELAY_MS = 1000;
	const { currentProjectData, isProjectSaved } = useContext(ProjectContext);
	const debouncedProject = useDebounce<ProjectContextData | null>(
		currentProjectData,
		AUTO_SAVE_DELAY_MS
	);
	const { updateProject, loading: autoSaveLoading } = useUpdateProjectService();

	useEffect(() => {
		if (!isProjectSaved && debouncedProject !== null) {
			updateProject(debouncedProject);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedProject, updateProject]);

	return { autoSaveLoading };
};
