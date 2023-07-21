import { useMutation } from '@apollo/client';
import { HOME_PATH } from 'constants/paths';
import AuthContext from 'context/auth/auth.context';
import { SignInMutation, SignInMutationVariables } from 'graphql/__generated__/graphql';
import { getGraphQLErrorMessage } from 'helpers/get-graphql-error-message';
import { SIGN_IN_MUTATION } from 'pages/sign-in/sign-in.graphql';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const useSignIn = () => {
	const [signInMutation, { loading }] = useMutation<SignInMutation, SignInMutationVariables>(
		SIGN_IN_MUTATION
	);

	const navigate = useNavigate();
	const { refetch: refetchProfile } = useContext(AuthContext);

	const signIn = async (email: string, password: string) => {
		await signInMutation({
			variables: { email, password },
			onCompleted: (data) => {
				toast.success(`You successfully signed in`);
				localStorage.setItem('cookies', data.signIn.cookies);
				refetchProfile();
				navigate(HOME_PATH);
			},
			onError: (error) => {
				toast.error(getGraphQLErrorMessage(error), { autoClose: 10000 });
			}
		});
	};

	return { loading, signIn };
};
