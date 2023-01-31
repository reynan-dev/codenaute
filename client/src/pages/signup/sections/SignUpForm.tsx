import Button from 'components/button';
import Input from 'components/input';
import { useEffect, useState } from 'react';

interface SignUpFormProps {
	className?: string;
	signUp: (username: string, email: string, password: string) => Promise<void>;
	isLoading: boolean;
}

export default function SignUpForm({ className, signUp, isLoading }: SignUpFormProps) {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repeatedPassword, setRepeatedPassword] = useState('');

	useEffect(() => {
		console.log({
			username,
			email,
			password
		});
	}, [username, password, email]);

	return (
		<div className={className}>
			<form
				onSubmit={async (event) => {
					event.preventDefault();
					await signUp(username, email, password);
				}}
				className='full-center-col w-full space-y-8'
			>
				<Input
					label='Username'
					value={username}
					onChange={(event) => {
						setUsername(event.target.value);
					}}
				/>
				<Input
					label='Email'
					value={email}
					onChange={(event) => {
						setEmail(event.target.value);
					}}
				/>
				<Input
					label='Password'
					type='password'
					value={password}
					onChange={(event) => {
						setPassword(event.target.value);
					}}
				/>
				<Input
					label='Repeat password'
					type='password'
					value={repeatedPassword}
					onChange={(event) => {
						setRepeatedPassword(event.target.value);
					}}
				/>

				<Button type='submit' disabled={isLoading} className='my-8'>
					Se connecter
				</Button>
			</form>
		</div>
	);
}
