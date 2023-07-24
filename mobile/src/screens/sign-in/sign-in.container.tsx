import React, { useEffect, useState } from 'react';
import { SignInForm } from 'screens/sign-in/_components/sign-in-form';
import { SignInScreen } from 'screens/sign-in/sign-in.screen';
import { useSignIn } from 'screens/sign-in/sign-in.service';

export interface SignInState {
	email: string;
	setEmail: React.Dispatch<React.SetStateAction<string>>;
	password: string;
	setPassword: React.Dispatch<React.SetStateAction<string>>;
}

export const SignInContainer = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const state: SignInState = {
		email,
		setEmail,
		password,
		setPassword
	};

	const { signIn, loading } = useSignIn();

	useEffect(() => {
		console.log(email);
	}, [email]);

	return (
		<SignInScreen signInForm={<SignInForm isLoading={loading} signIn={signIn} state={state} />} />
	);
};
