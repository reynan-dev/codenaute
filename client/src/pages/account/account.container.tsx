import { ApolloQueryResult, OperationVariables } from '@apollo/client';
import { useDeleteAccount } from 'api/profile/useDeleteAccount';
import { useUpdateEmail } from 'api/profile/useUpdateEmail';
import { useUpdatePassword } from 'api/profile/useUpdatePassword';
import { useUpdateUsername } from 'api/profile/useUpdateUsername';
import { SIGN_UP_PATH } from 'constants/paths';
import { ProfileQuery } from 'graphql/__generated__/graphql';
import { areSameValues } from 'helpers/areSameValues';
import { getFormErrors } from 'helpers/getFormErrors';
import { getGraphQLErrorMessage } from 'helpers/getGraphQLErrorMessage';
import { isContainingEmptyValue } from 'helpers/isContainingEmptyValue';
import { AccountPage } from 'pages/account/account.page';
import { DeleteAccountForm } from 'pages/account/components/DeleteAccountForm';
import { UpdateInformationsForm } from 'pages/account/components/UpdateInformationsForm';
import { UpdatePasswordForm } from 'pages/account/components/UpdatePasswordForm';
import { ErrorMessages } from 'pages/signUp/signUp.container';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export interface AccountContainerProps {
	isProfileLoading: boolean;
	profileData?: ProfileQuery | null;
	refetchProfile:
		| ((
				variables?: Partial<OperationVariables> | undefined
		  ) => Promise<ApolloQueryResult<ProfileQuery>>)
		| (() => void);
}

export const AccountContainer = ({
	isProfileLoading,
	profileData,
	refetchProfile
}: AccountContainerProps) => {
	const initialEmail = profileData?.profile.email;
	const initialUsername = profileData?.profile.username;

	const [newEmail, setNewEmail] = useState(initialEmail);
	const [newUsername, setNewUsername] = useState(initialUsername);

	const [oldPassword, setOldPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmedNewPassword, setConfirmedNewPassword] = useState('');
	const [deleteAccountPassword, setDeleteAccountPassword] = useState('');
	const [formErrorMessages, setFormErrorMessages] = useState<ErrorMessages | null>(null);

	const informationsFormState = {
		formErrorMessages,
		setFormErrorMessages,
		newEmail,
		setNewEmail,
		newUsername,
		setNewUsername
	};

	const passwordFormState = {
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

	const { updateEmail, loading: isUpdateEmailLoading } = useUpdateEmail();
	const { updateUsername, loading: isUpdateUsernameLoading } = useUpdateUsername();
	const { updatePassword, loading: isUpdatePasswordLoading } = useUpdatePassword();
	const { deleteAccount, loading: isDeleteAccountLoading } = useDeleteAccount();

	const navigate = useNavigate();

	const submitInformationsForm = async () => {
		if (newEmail && newUsername) {
			try {
				if (!areSameValues({ email: initialEmail }, { email: newEmail })) {
					await updateEmail({
						variables: { email: newEmail }
					});
				}
				if (!areSameValues({ username: initialUsername }, { username: newUsername })) {
					await updateUsername({
						variables: { username: newUsername }
					});
				}
				toast.success(`Informations successfully saved`);
				refetchProfile();
			} catch (error) {
				toast.error(getGraphQLErrorMessage(error), { autoClose: 10000 });
			}
		}
		return;
	};

	const handleInformationsForm = async () => {
		const formErrors = getFormErrors({ username: newUsername, email: newEmail });
		if (formErrors) {
			setFormErrorMessages(formErrors);
			return;
		}
		await submitInformationsForm();
	};

	const submitPasswordForm = async () => {
		try {
			await updatePassword({
				variables: { oldPassword, newPassword, confirmedNewPassword }
			});
			toast.success(`Password successfully changed`);
			setNewPassword('');
			setConfirmedNewPassword('');
			setOldPassword('');
		} catch (error) {
			toast.error(getGraphQLErrorMessage(error), { autoClose: 10000 });
		}
		return;
	};

	const handlePasswordForm = async () => {
		if (!isContainingEmptyValue([newPassword, oldPassword, confirmedNewPassword])) {
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
		await submitPasswordForm();
	};

	const fetchAndRedirect = async () => {
		try {
			await refetchProfile();
		} catch {
			navigate(SIGN_UP_PATH);
		}
	};

	const submitDeleteAccountForm = async () => {
		try {
			await deleteAccount({
				variables: { password: deleteAccountPassword }
			});
			toast.success(`Account successfully deleted`);
			fetchAndRedirect();
		} catch (error) {
			toast.error('getGraphQLErrorMessage(error), { autoClose: 10000 }');
		}
		return;
	};

	const handleDeleteAccountForm = async () => {
		if (isContainingEmptyValue([deleteAccountPassword])) {
			return toast.error('Please type your password to delete your account', { autoClose: 10000 });
		}
		await submitDeleteAccountForm();
	};

	return (
		<AccountPage
			updateInformationsForm={
				<UpdateInformationsForm
					isLoading={isUpdateEmailLoading || isUpdateUsernameLoading}
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
