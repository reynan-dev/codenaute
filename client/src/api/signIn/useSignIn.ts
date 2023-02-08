import { useMutation } from '@apollo/client';
import { SIGN_IN_MUTATION } from 'graphql/signIn/signIn.mutation';
import { SignInMutation, SignInMutationVariables } from 'graphql/__generated__/graphql';

export const useSignIn = () => {
	const [signIn, { loading }] = useMutation<SignInMutation, SignInMutationVariables>(
		SIGN_IN_MUTATION
	);

	return { loading, signIn };
};
