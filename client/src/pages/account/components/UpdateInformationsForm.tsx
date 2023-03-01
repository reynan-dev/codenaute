import Button from 'components/Button';
import Input from 'components/Input';
import { FaSave } from 'react-icons/fa';
import { FiSave } from 'react-icons/fi';

interface UpdateInformationsFormProps {
	state: {
		email: string | undefined;
		setEmail: React.Dispatch<React.SetStateAction<string | undefined>>;
		username: string | undefined;
		setUsername: React.Dispatch<React.SetStateAction<string | undefined>>;
	};
}

export const UpdateInformationsForm = ({ state }: UpdateInformationsFormProps) => {
	return (
		<form
			onSubmit={async (event) => {
				event.preventDefault();
				// handleForm();
			}}
			className='flex w-full flex-col items-center space-y-5 lg:flex-row lg:space-y-0 lg:space-x-5'
		>
			<Input
				label='Email'
				value={state.email}
				onChange={(event) => {
					// state.setEmail(event.target.value);
				}}
			/>

			<Input
				label='Username'
				value={state.username}
				onChange={(event) => {
					// state.setPassword(event.target.value);
				}}
			/>

			<Button size='small' type='submit' disabled={false} className='my-8'>
				<span className='flex items-center space-x-3'>
						<FaSave size={16} className='mb-0.5' />
					<span>Save</span>
				</span>
			</Button>
		</form>
	);
};
