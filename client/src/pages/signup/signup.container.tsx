import { useSignUp } from 'api/sign-up/useSignUp';
import { HOME_PATH } from 'constants/paths';
import { getGraphQLErrorMessage } from 'helpers/getGraphQLErrorMessage';
import { getFormErrors } from 'helpers/getFormErrors';
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
				variables: { username, email, password }
			});
			toast.success(`Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter.`);
			navigate(HOME_PATH);
		} catch (error) {
			toast.error(getGraphQLErrorMessage(error));
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
}
