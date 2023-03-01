import Button from 'components/Button';
import Input from 'components/Input';
import { ErrorMessages } from 'pages/signUp/signUp.container';
import { FaSave } from 'react-icons/fa';

interface UpdateInformationsFormProps {
	state: {
		formErrorMessages: ErrorMessages | null;
		setFormErrorMessages: React.Dispatch<React.SetStateAction<ErrorMessages | null>>;
		email: string | undefined;
		setEmail: React.Dispatch<React.SetStateAction<string | undefined>>;
		username: string | undefined;
		setUsername: React.Dispatch<React.SetStateAction<string | undefined>>;
		hasEmailChanged: boolean;
		hasUsernameChanged: boolean;
	};
	isLoading: boolean;
	handleInformationsForm: () => Promise<void>;
}

export const UpdateInformationsForm = ({
	state,
	isLoading,
	handleInformationsForm
}: UpdateInformationsFormProps) => {
	return (
		<form
			onSubmit={async (event) => {
				event.preventDefault();
				handleInformationsForm();
			}}
			className='flex w-full flex-col items-center lg:items-start space-y-5 lg:flex-row lg:space-y-0 lg:space-x-5'
		>
			<Input
				label='Email'
				value={state.email}
				onChange={(event) => {
					state.setEmail(event.target.value);
				}}
				error={state.formErrorMessages?.email}
			/>

			<Input
				label='Username'
				value={state.username}
				onChange={(event) => {
					state.setUsername(event.target.value);
				}}
				error={state.formErrorMessages?.username}
			/>

				<Button
					size='small'
					type='submit'
					disabled={!state.hasEmailChanged && !state.hasUsernameChanged}
					className='my-8 lg:mt-2.5'
					isLoading={isLoading}
				>
					<span className='flex items-center space-x-3'>
						<FaSave size={16} className='mb-0.5' />
						<span>Save</span>
					</span>
				</Button>
		</form>
	);
};
