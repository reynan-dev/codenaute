import Button from 'components/Button';
import Input from 'components/Input';
import { isContainingEmptyValue } from 'helpers/isContainingEmptyValue';
import { IoWarning } from 'react-icons/io5';
import { twJoin } from 'tailwind-merge';

interface DeleteAccountFormProps {
	state: {
		deleteAccountPassword: string;
		setDeleteAccountPassword: React.Dispatch<React.SetStateAction<string>>;
	};
	isLoading: boolean;
	handleDeleteAccountForm: () => Promise<void>;
}

export const DeleteAccountForm = ({
	state,
	isLoading,
	handleDeleteAccountForm
}: DeleteAccountFormProps) => {
	return (
		<form
			onSubmit={async (event) => {
				event.preventDefault();
				handleDeleteAccountForm();
			}}
			className={twJoin(
				'flex w-full flex-col items-center justify-between space-y-5',
				'lg:flex-row lg:items-start lg:space-y-0 lg:space-x-5'
			)}
		>
			<Input
				label='Password'
				type='password'
				value={state.deleteAccountPassword}
				onChange={(event) => {
					state.setDeleteAccountPassword(event.target.value);
				}}
			/>

			<Button
				size='small'
				type='submit'
				disabled={!isContainingEmptyValue([state.deleteAccountPassword])}
				className='mt-8 ml-5 border-danger bg-danger hover:border-danger-100 hover:bg-danger-100 lg:mt-2.5 lg:mb-0'
				isLoading={isLoading}
			>
				<span className='flex items-center space-x-3'>
					<IoWarning size={20} className='mb-0.5' />
					<span>Delete account</span>
				</span>
			</Button>
		</form>
	);
};
