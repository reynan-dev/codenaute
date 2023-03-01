import { useMutation } from '@apollo/client';
import { UPDATE_USERNAME_MUTATION } from 'graphql/profile/updateUsername';
import { UpdateUsernameMutation, UpdateUsernameMutationVariables } from 'graphql/__generated__/graphql';

export const useUpdateUsername = () => {
	const [updateUsername, { loading }] = useMutation<UpdateUsernameMutation, UpdateUsernameMutationVariables>(
		UPDATE_USERNAME_MUTATION
	);

	return { loading, updateUsername };
};
