import { useSignUp } from 'api/signUp/useSignUp';
import { SIGN_IN_PATH } from 'constants/paths';
import { getFormErrors } from 'helpers/getFormErrors';
import { getGraphQLErrorMessage } from 'helpers/getGraphQLErrorMessage';
import { SignUpForm } from 'pages/signUp/components/SignUpForm';
import { SignUpPage } from 'pages/signUp/signUp.page';
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
