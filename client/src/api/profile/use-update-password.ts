import { useMutation } from '@apollo/client';
import {
	UpdatePasswordMutation,
	UpdatePasswordMutationVariables
} from 'graphql/__generated__/graphql';
import { UPDATE_PASSWORD_MUTATION } from 'graphql/profile/update-password.mutation';

export const useUpdatePassword = () => {
	const [updatePassword, { loading }] = useMutation<
		UpdatePasswordMutation,
		UpdatePasswordMutationVariables
	>(UPDATE_PASSWORD_MUTATION);

	return { loading, updatePassword };
};
