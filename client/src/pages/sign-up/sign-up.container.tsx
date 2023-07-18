import { getFormErrors } from 'helpers/get-form-errors';
import { SignUpForm } from 'pages/sign-up/_components/sign-up-form';
import { SignUpPage } from 'pages/sign-up/sign-up.page';
import { useSignUp } from 'pages/sign-up/sign-up.service';
import { useState } from 'react';

export interface ErrorMessages {
	[key: string]: string;
}

export const SignUpContainer = () => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmedPassword, setConfirmedPassword] = useState('');
	const [formErrorMessages, setFormErrorMessages] = useState<ErrorMessages | null>(null);

	const state = {
		username,
		setUsername,
		email,
		setEmail,
		password,
		setPassword,
		confirmedPassword,
		setConfirmedPassword,
		formErrorMessages,
		setFormErrorMessages
	};

	const { signUp, loading } = useSignUp();

	const handleForm = async () => {
		const fieldsValue = {
			username: username,
			email: email,
			password: password,
			confirmedPassword: confirmedPassword
		};

		const formErrors = getFormErrors(fieldsValue);

		if (formErrors) {
			setFormErrorMessages(formErrors);
			return;
		}

		await signUp({
			username: state.username,
			email: state.email,
			password: state.password,
			confirmedPassword: state.confirmedPassword
		});
	};

	return (
		<SignUpPage
			signUpForm={<SignUpForm isLoading={loading} handleForm={handleForm} state={state} />}
		/>
	);
};
