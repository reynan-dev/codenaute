import { useMutation } from '@apollo/client';
import { useCreateProject } from 'api/project/use-project';
import AuthContext from 'context/auth.context';
import ProjectContext from 'context/project.context';
import { SandpackTemplates } from 'enums/sandpack-templates';
import {
	CreateProjectMutation,
	CreateProjectMutationVariables
} from 'graphql/__generated__/graphql';
import { CREATE_PROJECT_MUTATION } from 'graphql/project/create-project.mutation';
import { getGraphQLErrorMessage } from 'helpers/get-graphql-error-message';
import { useContext } from 'react';
import { toast } from 'react-toastify';

export type SandpackTemplate = (typeof SandpackTemplates)[keyof typeof SandpackTemplates];

interface SaveProjectServiceArgs {
	name: string;
	files: string;
	sandpackTemplate: string;
}

export const useSaveProjectService = (
	project: SaveProjectServiceArgs,
	setIsProjectSaved: React.Dispatch<React.SetStateAction<boolean>>
) => {
	const { setProjectData } = useContext(ProjectContext);
	const { createProject, loading: saveProjectLoading } = useCreateProject(setProjectData);
	// const [createProject, { loading }] = useMutation<
	//     CreateProjectMutation,
	//     CreateProjectMutationVariables
	// >(CREATE_PROJECT_MUTATION);
	const { profile } = useContext(AuthContext);

	const saveProject = async () => {
		if (!profile)
			return toast.error(
				'Une erreur inattendue est survenue. Veuillez vous reconnecter, puis réessayez.',
				{ autoClose: 10000 }
			);

		console.log({
			name: project.name,
			memberId: profile.profile.id,
			isTemplate: false,
			isPublic: false,
			sandpackTemplate: project.sandpackTemplate,
			files: project.files
		});

		try {
			await createProject({
				variables: {
					name: project.name,
					memberId: profile.profile.id,
					isTemplate: false,
					isPublic: false,
					sandpackTemplate: project.sandpackTemplate,
					files: project.files
				}
			});
			setIsProjectSaved(true);
		} catch (error) {
			toast.error(getGraphQLErrorMessage(error), { autoClose: 10000 });
		}
	};

	return { saveProject, saveProjectLoading };
};
