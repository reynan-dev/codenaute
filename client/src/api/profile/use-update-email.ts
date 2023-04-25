import { useMutation } from '@apollo/client';
import { UpdateEmailMutation, UpdateEmailMutationVariables } from 'graphql/__generated__/graphql';
import { UPDATE_EMAIL_MUTATION } from 'graphql/profile/update-email.mutation';

export const useUpdateEmail = () => {
	const [updateEmail, { loading }] = useMutation<UpdateEmailMutation, UpdateEmailMutationVariables>(
		UPDATE_EMAIL_MUTATION
	);

	return { loading, updateEmail };
};
