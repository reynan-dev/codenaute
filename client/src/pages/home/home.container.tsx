import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { HomePage } from './home.page';
import { useSignOut } from 'api/sign-out/use-sign-out';
import { SIGN_IN_PATH } from 'constants/paths';
import AuthContext from 'context/auth.context';
import { getGraphQLErrorMessage } from 'helpers/get-graphql-error-message';
import { SignOutButton } from 'pages/home/components/sign-out-button';

export const HomeContainer = () => {
	const onSignOutSuccess = async () => {
		try {
			await refetchProfile();
		} finally {
			navigate(SIGN_IN_PATH);
			toast.success(`You are successfully signed out`);
		}
	};

	const {
		profile: profileData,
		isAuthenticated,
		refetch: refetchProfile
	} = useContext(AuthContext);

	const { signOut } = useSignOut(onSignOutSuccess);

	const navigate = useNavigate();


	const handleSignOut = async () => {
		try {
			await signOut();
		} catch (error) {
			toast.error(getGraphQLErrorMessage(error), { autoClose: 10000 });
		}
		return;
	};

	return (
		<HomePage
			profileData={profileData}
			isAuthenticated={isAuthenticated}
			signOutButton={<SignOutButton handleSignOut={handleSignOut} />}
		/>
	);
};
