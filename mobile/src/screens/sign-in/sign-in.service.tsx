import { useMutation } from '@apollo/client';
import AuthContext from 'context/auth/auth.context';
import { SignInMutation, SignInMutationVariables } from 'gql/__generated__/graphql';
import { useContext } from 'react';
import { SIGN_IN_MUTATION } from 'screens/sign-in/sign-in.graphql';

export const useSignIn = () => {
	const [signInMutation, { loading }] = useMutation<SignInMutation, SignInMutationVariables>(
		SIGN_IN_MUTATION
	);

	// const navigate = useNavigate();
	const { refetch: refetchProfile } = useContext(AuthContext);

	const signIn = async (email: string, password: string) => {
		console.log('prout');
		await signInMutation({
			variables: { email, password },
			onCompleted: (data) => {
				// toast.success(`You successfully signed in`);
				refetchProfile();
				// navigate(HOME_PATH);
				console.log({ data });
			},
			onError: (error) => {
				console.error({ error });
				// toast.error(getGraphQLErrorMessage(error), { autoClose: 10000 });
			}
		});
	};

	return { loading, signIn };
};
