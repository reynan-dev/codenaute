import { useMutation } from '@apollo/client';
import { SignUpMutation, SignUpMutationVariables } from 'graphql/__generated__/graphql';
import { SIGN_UP_MUTATION } from 'graphql/signUp/sign-up.mutation';

export const useSignUp = () => {
	const [signUp, { loading }] = useMutation<SignUpMutation, SignUpMutationVariables>(
		SIGN_UP_MUTATION
	);

	return { loading, signUp };
};
