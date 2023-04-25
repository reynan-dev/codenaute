import Button from 'components/button';
import Input from 'components/input';

interface SignInFormProps {
	isLoading: boolean;
	handleForm: () => Promise<void>;
	state: {
		email: string;
		setEmail: React.Dispatch<React.SetStateAction<string>>;
		password: string;
		setPassword: React.Dispatch<React.SetStateAction<string>>;
	};
}

export const SignInForm = ({ isLoading, handleForm, state }: SignInFormProps) => {
	return (
		<form
			onSubmit={async (event) => {
				event.preventDefault();
				handleForm();
			}}
			className='full-center-col w-full space-y-8'
		>
			<Input
				label='Email'
				value={state.email}
				onChange={(event) => {
					state.setEmail(event.target.value);
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
				Sign in
			</Button>
		</form>
	);
};
