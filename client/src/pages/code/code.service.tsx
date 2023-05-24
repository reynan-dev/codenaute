import { useCreateProject } from 'api/project/use-project';
import AuthContext from 'context/auth.context';
import ProjectContext from 'context/project.context';
import { SandpackTemplates } from 'enums/sandpack-templates';
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
	const { createProject, loading } = useCreateProject(setProjectData);
	const { profile } = useContext(AuthContext);

	const saveProject = async () => {
		if (!profile)
			return toast.error(
				'Une erreur inattendue est survenue. Veuillez vous reconnecter, puis réessayez.',
				{ autoClose: 10000 }
			);
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

	return { saveProject };
};
