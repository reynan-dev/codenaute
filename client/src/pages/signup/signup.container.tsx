import { useMutation } from '@apollo/client';
import { HOME_PATH } from 'constants/paths';
import { SignUpMutation, SignUpMutationVariables } from 'graphql/__generated__/graphql';
import { SIGN_UP_MUTATION } from 'graphql/sign-up/signup.mutation';
import { getGraphQLErrorMessage } from 'helpers/getGraphQLErrorMessage';
import { getInputErrors } from 'helpers/getInputErrors';
import SignUpForm from 'pages/signup/sections/SignUpForm';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SignUpPage from './signup.page';



export interface ErrorMessages {
	[key: string]: string;
}


export default function SignUpContainer() {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmedPassword, setConfirmedPassword] = useState('');
	const [errorMessages, setErrorMessages] = useState<ErrorMessages | null>(null);

	const state = {
		username,
		setUsername,
		email,
		setEmail,
		password,
		setPassword,
		confirmedPassword,
		setConfirmedPassword,
		errorMessages,
		setErrorMessages
	}

	const [signUp, { loading }] = useMutation<SignUpMutation, SignUpMutationVariables>(SIGN_UP_MUTATION);
	const navigate = useNavigate();

	const submit = async (username: string, email: string, password: string) => {
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


	const handleForm = async () => {
		const inputsValue = {
			username: username,
			email: email,
			password: password,
			confirmedPassword: confirmedPassword
		};

		const errors = getInputErrors(inputsValue);

		if (errors) {
			setErrorMessages(errors);
			return;
		}

		await submit(username, email, password);
	};

	return <SignUpPage signUpForm={<SignUpForm isLoading={loading} handleForm={handleForm} state={state} />} />;
}
