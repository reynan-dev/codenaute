import Button from 'components/button';
import Input from 'components/input';
import { areSameValues } from 'helpers/are-same-values';
import { ErrorMessages } from 'pages/sign-up/sign-up.container';
import { FaSave } from 'react-icons/fa';
import { twJoin } from 'tailwind-merge';

interface UpdateInformationsFormProps {
	state: {
		formErrorMessages: ErrorMessages | null;
		setFormErrorMessages: React.Dispatch<React.SetStateAction<ErrorMessages | null>>;
		newEmail: string | undefined;
		setNewEmail: React.Dispatch<React.SetStateAction<string | undefined>>;
		newUsername: string | undefined;
		setNewUsername: React.Dispatch<React.SetStateAction<string | undefined>>;
	};
	isLoading: boolean;
	handleInformationsForm: () => Promise<void>;
	initialInformations: {
		email: string | undefined;
		username: string | undefined;
	};
}

export const UpdateInformationsForm = ({
	state,
	isLoading,
	handleInformationsForm,
	initialInformations
}: UpdateInformationsFormProps) => {
	return (
		<form
			onSubmit={async (event) => {
				event.preventDefault();
				handleInformationsForm();
			}}
			className={twJoin(
				'flex w-full flex-col items-center space-y-5',
				'lg:flex-row lg:items-start lg:space-x-5 lg:space-y-0'
			)}
		>
			<Input
				label='Email'
				value={state.newEmail}
				onChange={(event) => {
					state.setNewEmail(event.target.value);
				}}
				error={state.formErrorMessages?.email}
			/>

			<Input
				label='Username'
				value={state.newUsername}
				onChange={(event) => {
					state.setNewUsername(event.target.value);
				}}
				error={state.formErrorMessages?.username}
			/>

			<Button
				size='small'
				type='submit'
				disabled={areSameValues(initialInformations, {
					email: state.newEmail,
					username: state.newUsername
				})}
				className='ml-5 mt-8 lg:mb-0 lg:mt-2.5'
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
