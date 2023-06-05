import { useMutation } from '@apollo/client';
import { SignInMutation, SignInMutationVariables } from 'graphql/__generated__/graphql';
import { SIGN_IN_MUTATION } from 'pages/sign-in/sign-in.graphql';

export const useSignIn = () => {
	const [signIn, { loading }] = useMutation<SignInMutation, SignInMutationVariables>(
		SIGN_IN_MUTATION
	);

	return { loading, signIn };
};
