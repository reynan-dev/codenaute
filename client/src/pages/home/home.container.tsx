import { useSignOut } from 'api/signOut/useSignOut';
import { SIGN_IN_PATH } from 'constants/paths';
import AuthContext from 'context/auth.context';
import { getGraphQLErrorMessage } from 'helpers/getGraphQLErrorMessage';
import { SignOutButton } from 'pages/home/components/SignOutButton';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { HomePage } from './home.page';

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
