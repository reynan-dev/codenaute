import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { HomePage } from './home.page';
import { SIGN_IN_PATH } from 'constants/paths';
import { getGraphQLErrorMessage } from 'helpers/get-graphql-error-message';
import { SignOutButton } from 'pages/home/_components/sign-out-button';
import AuthContext from 'context/profile/auth.context';
import { useSignOut } from 'pages/home/home.service';

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
