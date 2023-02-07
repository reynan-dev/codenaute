import { Button } from 'components/Button/Button';
import { Input } from 'components/Input/Input';
import { ErrorMessages } from 'pages/signup/signup.container';

interface SignUpFormProps {
	isLoading: boolean;
	handleForm: () => Promise<void>;
	state: {
		username: string;
		setUsername: React.Dispatch<React.SetStateAction<string>>;
		email: string;
		setEmail: React.Dispatch<React.SetStateAction<string>>;
		password: string;
		setPassword: React.Dispatch<React.SetStateAction<string>>;
		confirmedPassword: string;
		setConfirmedPassword: React.Dispatch<React.SetStateAction<string>>;
		formErrorMessages: ErrorMessages | null;
		setFormErrorMessages: React.Dispatch<React.SetStateAction<ErrorMessages | null>>;
	};
}

export default function SignUpForm({ isLoading, handleForm, state }: SignUpFormProps) {
	return (
		<form
			onSubmit={async (event) => {
				event.preventDefault();
				handleForm();
			}}
			className='full-center-col w-full space-y-8'
		>
			<Input
				label='Username'
				value={state.username}
				onChange={(event) => {
					state.setUsername(event.target.value);
				}}
				error={state.formErrorMessages?.username}
			/>
			<Input
				label='Email'
				value={state.email}
				onChange={(event) => {
					state.setEmail(event.target.value);
				}}
				error={state.formErrorMessages?.email}
			/>
			<Input
				label='Password'
				type='password'
				value={state.password}
				onChange={(event) => {
					state.setPassword(event.target.value);
				}}
				error={state.formErrorMessages?.password}
			/>
			<Input
				label='Repeat password'
				type='password'
				value={state.confirmedPassword}
				onChange={(event) => {
					state.setConfirmedPassword(event.target.value);
				}}
				error={state.formErrorMessages?.confirmedPassword}
			/>

			<Button type='submit' disabled={isLoading} className='my-8'>
				Se connecter
			</Button>
		</form>
	);
}
