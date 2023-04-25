import { useMutation } from '@apollo/client';
import {
	UpdateUsernameMutation,
	UpdateUsernameMutationVariables
} from 'graphql/__generated__/graphql';
import { UPDATE_USERNAME_MUTATION } from 'graphql/profile/update-username.mutation';

export const useUpdateUsername = () => {
	const [updateUsername, { loading }] = useMutation<
		UpdateUsernameMutation,
		UpdateUsernameMutationVariables
	>(UPDATE_USERNAME_MUTATION);

	return { loading, updateUsername };
};
