import { SignInForm } from 'pages/sign-in/_components/sign-in-form';
import { SignInPage } from 'pages/sign-in/sign-in.page';
import { useSignIn } from 'pages/sign-in/sign-in.service';
import { useState } from 'react';

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

	return (
		<SignInPage signInForm={<SignInForm isLoading={loading} signIn={signIn} state={state} />} />
	);
};
