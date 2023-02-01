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
import { useSignUp } from 'hooks/sign-up/useSignUp';



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

	const {submit, loading} = useSignUp(username, email, password)

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

		submit();
	};

	return <SignUpPage signUpForm={<SignUpForm isLoading={loading} handleForm={handleForm} state={state} />} />;
}
