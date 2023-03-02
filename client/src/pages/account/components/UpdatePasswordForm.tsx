import Button from 'components/Button';
import Input from 'components/Input';
import { isFormComplete } from 'helpers/areEmptyValues';
import { ErrorMessages } from 'pages/signUp/signUp.container';
import { FaSave } from 'react-icons/fa';

interface UpdatePasswordFormProps {
	state: {
		formErrorMessages: ErrorMessages | null;
		setFormErrorMessages: React.Dispatch<React.SetStateAction<ErrorMessages | null>>;
		oldPassword: string;
		setOldPassword: React.Dispatch<React.SetStateAction<string>>;
		newPassword: string;
		setNewPassword: React.Dispatch<React.SetStateAction<string>>;
		confirmedNewPassword: string;
		setConfirmedNewPassword: React.Dispatch<React.SetStateAction<string>>;
	};
	isLoading: boolean;
	handlePasswordForm: () => Promise<void>;
}

export const UpdatePasswordForm = ({
	state,
	isLoading,
	handlePasswordForm
}: UpdatePasswordFormProps) => {
	return (
		<form
			onSubmit={async (event) => {
				event.preventDefault();
				handlePasswordForm();
			}}
			className='flex w-full flex-col items-center space-y-5 lg:flex-row lg:space-y-0 lg:space-x-5'
		>
			<div className='flex w-full flex-col space-y-5'>
				<Input
					label='Old password'
					type='password'
					value={state.oldPassword}
					onChange={(event) => {
						state.setOldPassword(event.target.value);
					}}
				/>
				<div className='flex flex-col space-y-5 lg:flex-row lg:space-y-0 lg:space-x-5'>
					<Input
						label='New password'
						type='password'
						value={state.newPassword}
						onChange={(event) => {
							state.setNewPassword(event.target.value);
						}}
						error={state.formErrorMessages?.password}
					/>
					<Input
						label='Repeat new password'
						type='password'
						value={state.confirmedNewPassword}
						onChange={(event) => {
							state.setConfirmedNewPassword(event.target.value);
						}}
						error={state.formErrorMessages?.confirmedPassword}
					/>
				</div>
			</div>

			<Button
				size='small'
				type='submit'
				disabled={!isFormComplete([state.newPassword, state.oldPassword, state.confirmedNewPassword])}
				className='mt-8 ml-5 lg:my-0'
				isLoading={isLoading}
			>
				<span className='flex items-center space-x-3'>
					<FaSave size={16} className='mb-0.5' />
					<span>Change password</span>
				</span>
			</Button>
		</form>
	);
};
