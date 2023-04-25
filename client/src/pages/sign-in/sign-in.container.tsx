import { useSignIn } from 'api/sign-in/use-sign-in';
import { HOME_PATH } from 'constants/paths';
import AuthContext from 'context/auth.context';
import { getGraphQLErrorMessage } from 'helpers/get-graphql-error-message';
import { SignInForm } from 'pages/sign-in/components/sign-in-form';
import { SignInPage } from 'pages/sign-in/sign-in.page';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const SignInContainer = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const { refetch: refetchProfile } = useContext(AuthContext);

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
			refetchProfile();
			navigate(HOME_PATH);
		} catch (error) {
			toast.error(getGraphQLErrorMessage(error), { autoClose: 10000 });
		}
	};

	return (
		<SignInPage signInForm={<SignInForm isLoading={loading} handleForm={submit} state={state} />} />
	);
};
