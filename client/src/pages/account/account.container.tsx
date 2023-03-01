import { ApolloQueryResult, OperationVariables } from '@apollo/client';
import { useUpdateEmail } from 'api/profile/useUpdateEmail';
import { useUpdatePassword } from 'api/profile/useUpdatePassword';
import { useUpdateUsername } from 'api/profile/useUpdateUsername';
import { ProfileQuery } from 'graphql/__generated__/graphql';
import { getFormErrors } from 'helpers/getFormErrors';
import { getGraphQLErrorMessage } from 'helpers/getGraphQLErrorMessage';
import { AccountPage } from 'pages/account/account.page';
import { UpdateInformationsForm } from 'pages/account/components/UpdateInformationsForm';
import { UpdatePasswordForm } from 'pages/account/components/UpdatePasswordForm';
import { ErrorMessages } from 'pages/signUp/signUp.container';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export interface AccountContainerProps {
	isProfileLoading: boolean;
	profileData: ProfileQuery | undefined;
	refetchProfile: (
		variables?: Partial<OperationVariables> | undefined
	) => Promise<ApolloQueryResult<ProfileQuery>>;
}

export const AccountContainer = ({
	isProfileLoading,
	profileData,
	refetchProfile
}: AccountContainerProps) => {
	const [email, setEmail] = useState(profileData?.profile.email);
	const [username, setUsername] = useState(profileData?.profile.username);
	const [oldPassword, setOldPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmedNewPassword, setConfirmedNewPassword] = useState('');

	const [hasEmailChanged, setHasEmailChanged] = useState(false);
	const [hasUsernameChanged, setHasUsernameChanged] = useState(false);
	const [isPasswordFormComplete, setIsPasswordFormComplete] = useState(false);

	const [formErrorMessages, setFormErrorMessages] = useState<ErrorMessages | null>(null);

	const informationsFormState = {
		formErrorMessages,
		setFormErrorMessages,
		email,
		setEmail,
		username,
		setUsername,
		hasEmailChanged,
		hasUsernameChanged
	};

	const passwordFormState = {
		formErrorMessages,
		setFormErrorMessages,
		oldPassword,
		setOldPassword,
		newPassword,
		setNewPassword,
		confirmedNewPassword,
		setConfirmedNewPassword,
		isPasswordFormComplete
	};

	const { updateEmail, loading: isUpdateEmailLoading } = useUpdateEmail();
	const { updateUsername, loading: isUpdateUsernameLoading } = useUpdateUsername();
	const { updatePassword, loading: isUpdatePasswordLoading } = useUpdatePassword();

	useEffect(() => {
		const initialEmail = profileData?.profile.email;
		const initialUsername = profileData?.profile.username;

		const checkEmailUpdate = (emailState: string | undefined) => {
			if (emailState && emailState === initialEmail) return setHasEmailChanged(false);
			setHasEmailChanged(true);
		};

		const checkUsernameUpdate = (usernameState: string | undefined) => {
			if (usernameState && usernameState === initialUsername) return setHasUsernameChanged(false);
			setHasUsernameChanged(true);
		};

		checkEmailUpdate(email);
		checkUsernameUpdate(username);
	}, [email, profileData?.profile.email, profileData?.profile.username, username]);

	useEffect(() => {
		if (newPassword === '' || confirmedNewPassword === '' || oldPassword === '') {
			return setIsPasswordFormComplete(false);
		}
		setIsPasswordFormComplete(true);
	}, [newPassword, confirmedNewPassword, oldPassword]);

	const submitInformationsForm = async () => {
		if (email && username) {
			try {
				if (hasEmailChanged) {
					await updateEmail({
						variables: { email }
					});
				}
				if (hasUsernameChanged) {
					await updateUsername({
						variables: { username }
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
		const formErrors = getFormErrors({ username, email });

		if (formErrors) {
			setFormErrorMessages(formErrors);
			return;
		}

		await submitInformationsForm();
	};

	const submitPasswordForm = async () => {
		if (oldPassword && newPassword && confirmedNewPassword) {
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
		}
		return;
	};

	const handlePasswordForm = async () => {
		// const formErrors = getFormErrors({ username, email });

		// if (formErrors) {
		// 	setFormErrorMessages(formErrors);
		// 	return;
		// }

		await submitPasswordForm();
	};

	return (
		<AccountPage
			updateInformationsForm={
				<UpdateInformationsForm
					isLoading={isUpdateEmailLoading || isUpdateUsernameLoading}
					state={informationsFormState}
					handleInformationsForm={handleInformationsForm}
				/>
			}
			updatePasswordForm={
				<UpdatePasswordForm
					isLoading={isUpdatePasswordLoading}
					state={passwordFormState}
					handlePasswordForm={handlePasswordForm}
				/>
			}
		/>
	);
};
