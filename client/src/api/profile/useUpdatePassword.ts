import { useMutation } from '@apollo/client';
import { UPDATE_PASSWORD_MUTATION } from 'graphql/profile/updatePassword.mutation';
import { UpdatePasswordMutation, UpdatePasswordMutationVariables } from 'graphql/__generated__/graphql';

export const useUpdatePassword = () => {
	const [updatePassword, { loading }] = useMutation<UpdatePasswordMutation, UpdatePasswordMutationVariables>(
		UPDATE_PASSWORD_MUTATION
	);

	return { loading, updatePassword };
};
