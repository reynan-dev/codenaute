import Button from 'components/Button';
import Input from 'components/Input';

interface LoginFormProps {
	isLoading: boolean;
	handleForm: () => Promise<void>;
	state: {
		usernameOrEmail: string;
		setUsernameOrEmail: React.Dispatch<React.SetStateAction<string>>;
		password: string;
		setPassword: React.Dispatch<React.SetStateAction<string>>;
	};
}

export default function LoginForm({ isLoading, handleForm, state }: LoginFormProps) {
	return (
		<form
			onSubmit={async (event) => {
				event.preventDefault();
				handleForm();
			}}
			className='full-center-col w-full space-y-8'
		>
			<Input
				label='Username / Email address'
				value={state.usernameOrEmail}
				onChange={(event) => {
					state.setUsernameOrEmail(event.target.value);
				}}
			/>

			<Input
				label='Password'
				type='password'
				value={state.password}
				onChange={(event) => {
					state.setPassword(event.target.value);
				}}
			/>

			<Button type='submit' disabled={isLoading} className='my-8'>
				Se connecter
			</Button>
		</form>
	);
}
