import { useMutation } from '@apollo/client';
import {
	DeleteAccountMutation,
	DeleteAccountMutationVariables,
	UpdateEmailMutation,
	UpdateEmailMutationVariables,
	UpdatePasswordMutation,
	UpdatePasswordMutationVariables,
	UpdateUsernameMutation,
	UpdateUsernameMutationVariables
} from 'graphql/__generated__/graphql';
import {
	DELETE_ACCOUNT_MUTATION,
	UPDATE_EMAIL_MUTATION,
	UPDATE_PASSWORD_MUTATION,
	UPDATE_USERNAME_MUTATION
} from 'pages/account/account.repository';

export const useDeleteAccount = (onDeleteAccountSuccess: () => Promise<void>) => {
	const [deleteAccount, { loading }] = useMutation<
		DeleteAccountMutation,
		DeleteAccountMutationVariables
	>(DELETE_ACCOUNT_MUTATION, {
		onCompleted: async () => {
			await onDeleteAccountSuccess();
		}
	});

	return { loading, deleteAccount };
};

export const useUpdateEmail = () => {
	const [updateEmail, { loading }] = useMutation<UpdateEmailMutation, UpdateEmailMutationVariables>(
		UPDATE_EMAIL_MUTATION
	);

	return { loading, updateEmail };
};

export const useUpdatePassword = () => {
	const [updatePassword, { loading }] = useMutation<
		UpdatePasswordMutation,
		UpdatePasswordMutationVariables
	>(UPDATE_PASSWORD_MUTATION);

	return { loading, updatePassword };
};

export const useUpdateUsername = () => {
	const [updateUsername, { loading }] = useMutation<
		UpdateUsernameMutation,
		UpdateUsernameMutationVariables
	>(UPDATE_USERNAME_MUTATION);

	return { loading, updateUsername };
};
