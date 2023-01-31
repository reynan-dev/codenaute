import Button from 'components/button';
import Input from 'components/input';
import { getInputErrors } from 'helpers/getInputErrors';
import { useState } from 'react';

interface SignUpFormProps {
	className?: string;
	signUp: (username: string, email: string, password: string) => Promise<void>;
	isLoading: boolean;
}

interface ErrorMessages {
	[key: string]: string;
}

export default function SignUpForm({ className, signUp, isLoading }: SignUpFormProps) {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmedPassword, setConfirmedPassword] = useState('');
	const [errorMessages, setErrorMessages] = useState<ErrorMessages | null>(null);

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

		await signUp(username, email, password);
	};

	return (
		<div className={className}>
			<form
				onSubmit={async (event) => {
					event.preventDefault();
					handleForm();
				}}
				className='full-center-col w-full space-y-8'
			>
				<Input
					label='Username'
					value={username}
					onChange={(event) => {
						setUsername(event.target.value);
					}}
					error={errorMessages?.username}
				/>
				<Input
					label='Email'
					value={email}
					onChange={(event) => {
						setEmail(event.target.value);
					}}
					error={errorMessages?.email}
				/>
				<Input
					label='Password'
					type='password'
					value={password}
					onChange={(event) => {
						setPassword(event.target.value);
					}}
					error={errorMessages?.password}
				/>
				<Input
					label='Repeat password'
					type='password'
					value={confirmedPassword}
					onChange={(event) => {
						setConfirmedPassword(event.target.value);
					}}
					error={errorMessages?.confirmedPassword}
				/>

				<Button type='submit' disabled={isLoading} className='my-8'>
					Se connecter
				</Button>
			</form>
		</div>
	);
}
