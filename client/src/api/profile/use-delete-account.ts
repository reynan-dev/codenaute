import { useMutation } from '@apollo/client';
import {
	DeleteAccountMutation,
	DeleteAccountMutationVariables
} from 'graphql/__generated__/graphql';
import { DELETE_ACCOUNT_MUTATION } from 'graphql/profile/delete-account.mutation';

export const useDeleteAccount = (onDeleteAccountSuccess: () => Promise<void>) => {
	const [deleteAccount, { loading }] = useMutation<
		DeleteAccountMutation,
		DeleteAccountMutationVariables
	>(DELETE_ACCOUNT_MUTATION,
		{
			onCompleted: async () => {
				await onDeleteAccountSuccess();
			},
		});

	return { loading, deleteAccount };
};
