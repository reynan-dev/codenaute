import { useMutation } from '@apollo/client';
import { HOME_PATH } from 'constants/paths';
import { SIGN_UP_MUTATION } from 'graphql/sign-up/signup.mutation';
import { SignUpMutation, SignUpMutationVariables } from 'graphql/__generated__/graphql';
import { getGraphQLErrorMessage } from 'helpers/getGraphQLErrorMessage';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const useSignUp = (username: string, email: string, password: string) => {
	const [signUp, { loading }] = useMutation<SignUpMutation, SignUpMutationVariables>(
		SIGN_UP_MUTATION
	);
	const navigate = useNavigate();

	const submit = async () => {
		try {
			await signUp({
				variables: { username, email, password }
			});
			toast.success(`Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter.`);
			navigate(HOME_PATH);
		} catch (error) {
			toast.error(getGraphQLErrorMessage(error));
		}
	};

    return {loading, submit}
};
