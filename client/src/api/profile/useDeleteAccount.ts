import { useMutation } from '@apollo/client';
import { DELETE_ACCOUNT_MUTATION } from 'graphql/profile/deleteAccount.mutation';
import {
    DeleteAccountMutation,
    DeleteAccountMutationVariables
} from 'graphql/__generated__/graphql';

export const useDeleteAccount = () => {
	const [deleteAccount, { loading }] = useMutation<
		DeleteAccountMutation,
        DeleteAccountMutationVariables
        >(DELETE_ACCOUNT_MUTATION);

	return { loading, deleteAccount };
};
