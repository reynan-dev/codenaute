import { useMutation } from '@apollo/client';
import { Project, projectFixtures } from 'fixtures/projects-fixtures';
import {
	CreateProjectMutation,
	CreateProjectMutationVariables
} from 'graphql/__generated__/graphql';
import { CREATE_PROJECT_MUTATION } from 'graphql/project/create-project.mutation';
import { useEffect } from 'react';

export const useCreateProject = (
	setProjectData: React.Dispatch<React.SetStateAction<Project | null>>
) => {
	useEffect(() => {
		setProjectData(projectFixtures);
	}, [setProjectData]);

	const [createProject, { loading }] = useMutation<
		CreateProjectMutation,
		CreateProjectMutationVariables
	>(CREATE_PROJECT_MUTATION);

	return { loading, createProject };
};
