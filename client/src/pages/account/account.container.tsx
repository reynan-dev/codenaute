import AuthContext from 'context/auth/auth.context';
import { getFormErrors } from 'helpers/get-form-errors';
import { isContainingEmptyValue } from 'helpers/is-containing-empty-value';
import { DeleteAccountForm } from 'pages/account/_components/delete-account-form';
import { UpdateInformationsForm } from 'pages/account/_components/update-informations-form';
import { UpdatePasswordForm } from 'pages/account/_components/update-password-form';
import { AccountPage } from 'pages/account/account.page';
import {
	useDeleteAccountService,
	useUpdateInformations,
	useUpdatePasswordService
} from 'pages/account/account.service';
import { ErrorMessages } from 'pages/sign-up/sign-up.container';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { SetState } from 'types/react';

export interface InformationsStateForm {
	formErrorMessages: ErrorMessages | null;
	setFormErrorMessages: SetState<ErrorMessages | null>;
	newEmail: string | undefined;
	setNewEmail: SetState<string | undefined>;
	newUsername: string | undefined;
	setNewUsername: SetState<string | undefined>;
}

export interface PasswordFormState {
	formErrorMessages: ErrorMessages | null;
	setFormErrorMessages: SetState<ErrorMessages | null>;
	oldPassword: string;
	setOldPassword: SetState<string>;
	newPassword: string;
	setNewPassword: SetState<string>;
	confirmedNewPassword: string;
	setConfirmedNewPassword: SetState<string>;
}

export const AccountContainer = () => {
	const { profile: profileData } = useContext(AuthContext);

	const initialEmail = profileData?.profile.email;
	const initialUsername = profileData?.profile.username;

	const [newEmail, setNewEmail] = useState(initialEmail);
	const [newUsername, setNewUsername] = useState(initialUsername);

	const [oldPassword, setOldPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmedNewPassword, setConfirmedNewPassword] = useState('');
	const [deleteAccountPassword, setDeleteAccountPassword] = useState('');
	const [formErrorMessages, setFormErrorMessages] = useState<ErrorMessages | null>(null);

	const informationsFormState: InformationsStateForm = {
		formErrorMessages,
		setFormErrorMessages,
		newEmail,
		setNewEmail,
		newUsername,
		setNewUsername
	};

	const passwordFormState: PasswordFormState = {
		formErrorMessages,
		setFormErrorMessages,
		oldPassword,
		setOldPassword,
		newPassword,
		setNewPassword,
		confirmedNewPassword,
		setConfirmedNewPassword
	};

	const deleteAccountFormState = {
		deleteAccountPassword,
		setDeleteAccountPassword
	};

	const { updatePassword, loading: isUpdatePasswordLoading } =
		useUpdatePasswordService(passwordFormState);
	const { deleteAccount, loading: isDeleteAccountLoading } =
		useDeleteAccountService(deleteAccountPassword);
	const { updateInformations, updateEmailLoading, updateUsernameLoading } = useUpdateInformations();

	const handleInformationsForm = async () => {
		const formErrors = getFormErrors({ username: newUsername, email: newEmail });
		if (formErrors) {
			setFormErrorMessages(formErrors);
			return;
		}
		await updateInformations(informationsFormState);
	};

	const handlePasswordForm = async () => {
		if (isContainingEmptyValue([newPassword, oldPassword, confirmedNewPassword])) {
			return toast.error('Please fill all relating password fields', { autoClose: 10000 });
		}
		const formErrors = getFormErrors({
			password: newPassword,
			confirmedPassword: confirmedNewPassword
		});
		if (formErrors) {
			setFormErrorMessages(formErrors);
			return;
		}
		await updatePassword({
			variables: {
				confirmedNewPassword,
				newPassword,
				oldPassword
			}
		});
	};

	const handleDeleteAccountForm = async () => {
		if (isContainingEmptyValue([deleteAccountPassword])) {
			return toast.error('Please type your password to delete your account', { autoClose: 10000 });
		}
		await deleteAccount({
			variables: { password: deleteAccountPassword }
		});
	};

	return (
		<AccountPage
			updateInformationsForm={
				<UpdateInformationsForm
					isLoading={updateEmailLoading || updateUsernameLoading}
					state={informationsFormState}
					handleInformationsForm={handleInformationsForm}
					initialInformations={{ email: initialEmail, username: initialUsername }}
				/>
			}
			updatePasswordForm={
				<UpdatePasswordForm
					isLoading={isUpdatePasswordLoading}
					state={passwordFormState}
					handlePasswordForm={handlePasswordForm}
				/>
			}
			deleteAccountForm={
				<DeleteAccountForm
					isLoading={isDeleteAccountLoading}
					state={deleteAccountFormState}
					handleDeleteAccountForm={handleDeleteAccountForm}
				/>
			}
		/>
	);
};
