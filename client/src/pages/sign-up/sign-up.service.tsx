import { useMutation } from '@apollo/client';
import { SIGN_IN_PATH } from 'constants/paths';
import { SignUpMutation, SignUpMutationVariables } from 'graphql/__generated__/graphql';
import { getGraphQLErrorMessage } from 'helpers/get-graphql-error-message';
import { SIGN_UP_MUTATION } from 'pages/sign-up/sign-up.graphql';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const useSignUp = () => {
	const [signUpMutation, { loading }] = useMutation<SignUpMutation, SignUpMutationVariables>(
		SIGN_UP_MUTATION
	);

	const navigate = useNavigate();

	const signUp = async (variables: SignUpMutationVariables) => {
		const { username, email, password, confirmedPassword } = variables;

		await signUpMutation({
			variables: {
				username,
				email,
				password,
				confirmedPassword
			},
			onCompleted: () => {
				toast.success(`Your account is successfully created. You can now sign in.`);
				navigate(SIGN_IN_PATH);
			},
			onError: (error) => {
				toast.error(getGraphQLErrorMessage(error), { autoClose: 10000 });
			}
		});
	};

	return { loading, signUp };
};
