import { gql, useMutation } from '@apollo/client';
import { HOME_PATH } from 'constants/paths';
import { SignUpMutation, SignUpMutationVariables } from 'gql/graphql';
import { getErrorMessage } from 'helpers/getErrorMessage';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignUpPage from './signup.page';

const SIGN_UP = gql`
	mutation SignUp($username: String!, $email: String!, $password: String!) {
		signUp(username: $username, email: $email, password: $password) {
			id
			email
		}
	}
`;

export default function SignUpContainer() {
	const [signUp, { loading }] = useMutation<SignUpMutation, SignUpMutationVariables>(SIGN_UP);
	const navigate = useNavigate();
	const [errorMessage, setErrorMessage] = useState('')

	const submit = async (username: string, email: string, password: string) => {
		console.log({
			username,
			email,
			password
		});

		try {
			await signUp({
				variables: { username, email, password }
			});
			//   toast.success(
			// 	`Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter.`
			//   );
			console.log('SUCCESS');
			navigate(HOME_PATH);
		} catch (error) {
			//   toast.error(getErrorMessage(error));
			setErrorMessage(getErrorMessage(error))
			console.error(getErrorMessage(error));
		}
	};

	return <SignUpPage signUp={submit} isLoading={loading} />;
}
