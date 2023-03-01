import { ApolloQueryResult, OperationVariables } from '@apollo/client';
import { useUpdateEmail } from 'api/profile/useUpdateEmail';
import { useUpdateUsername } from 'api/profile/useUpdateUsername';
import { ProfileQuery } from 'graphql/__generated__/graphql';
import { getGraphQLErrorMessage } from 'helpers/getGraphQLErrorMessage';
import { AccountPage } from 'pages/account/account.page';
import { UpdateInformationsForm } from 'pages/account/components/UpdateInformationsForm';
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
	const [hasEmailChanged, setHasEmailChanged] = useState(false);
	const [hasUsernameChanged, setHasUsernameChanged] = useState(false);

	const state = {
		email,
		setEmail,
		username,
		setUsername,
		hasEmailChanged,
		hasUsernameChanged
	};

	const { updateEmail, loading: isUpdateEmailLoading } = useUpdateEmail();
	const { updateUsername, loading: isUpdateUsernameLoading } = useUpdateUsername();

	// const navigate = useNavigate();

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

		console.log(username);
	}, [email, profileData?.profile.email, profileData?.profile.username, username]);

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

	return (
		<AccountPage
			updateInformationsForm={
				<UpdateInformationsForm
					isLoading={isUpdateEmailLoading || isUpdateUsernameLoading}
					state={state}
					handleForm={submitInformationsForm}
				/>
			}
		/>
	);
};
