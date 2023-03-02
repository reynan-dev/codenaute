import { useMutation } from '@apollo/client';
import { UPDATE_EMAIL_MUTATION } from 'graphql/profile/updateEmail.mutation';
import { UpdateEmailMutation, UpdateEmailMutationVariables } from 'graphql/__generated__/graphql';

export const useUpdateEmail = () => {
	const [updateEmail, { loading }] = useMutation<UpdateEmailMutation, UpdateEmailMutationVariables>(
		UPDATE_EMAIL_MUTATION
	);

	return { loading, updateEmail };
};
