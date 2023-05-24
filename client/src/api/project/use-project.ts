import { useMutation } from '@apollo/client';
import ProjectContext from 'context/project.context';
import { Project, projectFixtures } from 'fixtures/projects-fixtures';
import {
	CreateProjectMutation,
	CreateProjectMutationVariables
} from 'graphql/__generated__/graphql';
import { CREATE_PROJECT_MUTATION } from 'graphql/project/create-project.mutation';
import { useContext, useEffect } from 'react';

export const useCreateProject = () => {
	const { setGetProjectDataResult } = useContext(ProjectContext);

	const [createProject, { loading }] = useMutation<
		CreateProjectMutation,
		CreateProjectMutationVariables
	>(CREATE_PROJECT_MUTATION);

	return { loading, createProject };
};
