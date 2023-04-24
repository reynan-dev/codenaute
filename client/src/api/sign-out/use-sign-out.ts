import { useMutation } from '@apollo/client';
import {
	SignOutMutation,
	SignOutMutationVariables
} from 'graphql/__generated__/graphql';
import { SIGN_OUT_MUTATION } from 'graphql/sign-out/sign-out.mutation';

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
