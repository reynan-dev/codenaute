import { useMutation } from '@apollo/client';
import AuthContext from 'context/auth.context';
import ProjectContext from 'context/project.context';
import {
	CreateProjectMutation,
	CreateProjectMutationVariables
} from 'graphql/__generated__/graphql';
import { CREATE_PROJECT_MUTATION } from 'graphql/project/create-project.mutation';
import { getGraphQLErrorMessage } from 'helpers/get-graphql-error-message';
import { onSuccess, mapProjectDataResponse } from 'pages/code/code.service';
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
				isTemplate: false,
				isPublic: false,
				sandpackTemplate: project.sandpackTemplate ?? '',
				files: JSON.stringify(project.files)
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
