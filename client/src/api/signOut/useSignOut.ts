import { useMutation } from '@apollo/client';
import { SIGN_OUT_MUTATION } from 'graphql/signOut/signOut.mutation';
import {
	SignOutMutation,
	SignOutMutationVariables
} from 'graphql/__generated__/graphql';

export const useSignOut = (onSignOutSuccess: () => Promise<void>) => {
	const [signOut, { loading }] = useMutation<SignOutMutation, SignOutMutationVariables>(
		SIGN_OUT_MUTATION,
		{
			onCompleted: async () => {
				await onSignOutSuccess();
			},
		}
	);

	return { loading, signOut };
};
