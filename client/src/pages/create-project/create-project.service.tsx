import { useMutation } from '@apollo/client';
import AuthContext from 'context/auth/auth.context';
import ProjectContext from 'context/project/project.context';
import {
	CreateProjectMutation,
	CreateProjectMutationVariables
} from 'graphql/__generated__/graphql';
import { getGraphQLErrorMessage } from 'helpers/get-graphql-error-message';
import { mapProjectDataResponse, onSuccess } from 'pages/code/code.service';
import { CREATE_PROJECT_MUTATION } from 'pages/create-project/create-project.graphql';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ProjectContextData } from 'types/project';

export const useCreateProjectService = () => {
	const [createProjectMutation, { data, loading }] = useMutation<
		CreateProjectMutation,
		CreateProjectMutationVariables
	>(CREATE_PROJECT_MUTATION);

	const { profile } = useContext(AuthContext);
	const { setLastSavedProjectData, setCurrentProjectData } = useContext(ProjectContext);
	const navigate = useNavigate();

	const createProject = async (project: ProjectContextData) => {
		if (!profile) {
			return toast.error('An unexpected error has occurred. Please log in again and try again.', {
				autoClose: 10000
			});
		}

		await createProjectMutation({
			variables: {
				name: project.name,
				memberId: profile.profile.id,
				isTemplate: project.isTemplate,
				isPublic: project.isPublic,
				sandpackTemplate: project.sandpackTemplate ?? '',
				files: JSON.stringify(project.files),
				environment: project.environment,
				main: project.main
			},
			onCompleted(data) {
				onSuccess(
					{ setLastSavedProjectData, setCurrentProjectData },
					data ? mapProjectDataResponse(data.createProject) : project
				);

				navigate(`/code/${data.createProject.id}`);
			},
			onError(error) {
				toast.error(getGraphQLErrorMessage(error), { autoClose: 10000 });
			}
		});
	};

	return { data, loading, createProject };
};
