import { useSignIn } from 'api/signIn/useSignIn';
import { HOME_PATH } from 'constants/paths';
import { getGraphQLErrorMessage } from 'helpers/getGraphQLErrorMessage';
import { SignInForm } from 'pages/signIn/components/SignInForm';
import { LoginPage } from 'pages/signIn/signIn.page';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const SignInContainer = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const state = {
		email,
		setEmail,
		password,
		setPassword
	};

	const { signIn, loading } = useSignIn();
	const navigate = useNavigate();

	const submit = async () => {
		try {
			await signIn({
				variables: { email, password }
			});
			toast.success(`You successfully signed in`);
			navigate(HOME_PATH);
		} catch (error) {
			toast.error(getGraphQLErrorMessage(error), { autoClose: 10000 });
		}
	};

	return (
		<LoginPage loginForm={<SignInForm isLoading={loading} handleForm={submit} state={state} />} />
	);
};
