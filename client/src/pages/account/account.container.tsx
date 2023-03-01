import { ApolloQueryResult, OperationVariables } from '@apollo/client';
import { ProfileQuery } from 'graphql/__generated__/graphql';
import { getGraphQLErrorMessage } from 'helpers/getGraphQLErrorMessage';
import { AccountPage } from 'pages/account/account.page';
import { UpdateInformationsForm } from 'pages/account/components/UpdateInformationsForm';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

	const state = {
		email,
		setEmail,
		username,
		setUsername
	};

	// const { signIn, loading } = useSignIn();
	const navigate = useNavigate();

	const submit = async () => {
		try {
			// await signIn({
			// 	variables: { email, password }
			// });
			toast.success(`You successfully signed in`);
			// refetchProfile()
			// navigate(HOME_PATH);
		} catch (error) {
			toast.error(getGraphQLErrorMessage(error), { autoClose: 10000 });
		}
	};

	return <AccountPage updateInformationsForm={<UpdateInformationsForm state={state} />} />;
};
