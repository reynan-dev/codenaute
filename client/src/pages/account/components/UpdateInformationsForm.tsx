import Button from 'components/Button';
import Input from 'components/Input';
import { FaSave } from 'react-icons/fa';

interface UpdateInformationsFormProps {
	state: {
		email: string | undefined;
		setEmail: React.Dispatch<React.SetStateAction<string | undefined>>;
		username: string | undefined;
		setUsername: React.Dispatch<React.SetStateAction<string | undefined>>;
		hasEmailChanged: boolean;
		hasUsernameChanged: boolean;
	};
	isLoading: boolean;
	handleForm: () => Promise<void>;
}

export const UpdateInformationsForm = ({ state, isLoading, handleForm }: UpdateInformationsFormProps) => {
	return (
		<form
			onSubmit={async (event) => {
				event.preventDefault();
				handleForm();
			}}
			className='flex w-full flex-col items-center space-y-5 lg:flex-row lg:space-y-0 lg:space-x-5'
		>
			<Input
				label='Email'
				value={state.email}
				onChange={(event) => {
					state.setEmail(event.target.value);
				}}
			/>

			<Input
				label='Username'
				value={state.username}
				onChange={(event) => {
					state.setUsername(event.target.value);
				}}
			/>

			<Button size='small' type='submit' disabled={!state.hasEmailChanged && !state.hasUsernameChanged} className='my-8' isLoading={isLoading}>
				<span className='flex items-center space-x-3'>
					<FaSave size={16} className='mb-0.5' />
					<span>Save</span>
				</span>
			</Button>
		</form>
	);
};
