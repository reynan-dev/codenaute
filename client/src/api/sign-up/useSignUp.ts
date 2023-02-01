import { useMutation } from '@apollo/client';
import { SIGN_UP_MUTATION } from 'graphql/sign-up/signup.mutation';
import { SignUpMutation, SignUpMutationVariables } from 'graphql/__generated__/graphql';

export const useSignUp = () => {
	const [signUp, { loading }] = useMutation<SignUpMutation, SignUpMutationVariables>(
		SIGN_UP_MUTATION
	);

	return { loading, signUp };
};
