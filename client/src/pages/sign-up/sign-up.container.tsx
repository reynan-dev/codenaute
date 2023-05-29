import { SIGN_IN_PATH } from 'constants/paths';
import { getFormErrors } from 'helpers/get-form-errors';
import { getGraphQLErrorMessage } from 'helpers/get-graphql-error-message';
import { SignUpForm } from 'pages/sign-up/_components/sign-up-form';
import { SignUpPage } from 'pages/sign-up/sign-up.page';
import { useSignUp } from 'pages/sign-up/sign-up.service';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

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
	const navigate = useNavigate();

	const submit = async () => {
		try {
			await signUp({
				variables: { username, email, password, confirmedPassword }
			});
			toast.success(`Your account is successfully created. You can now sign in.`);
			navigate(SIGN_IN_PATH);
		} catch (error) {
			toast.error(getGraphQLErrorMessage(error), { autoClose: 10000 });
		}
	};

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

		await submit();
	};

	return (
		<SignUpPage
			signUpForm={<SignUpForm isLoading={loading} handleForm={handleForm} state={state} />}
		/>
	);
};
