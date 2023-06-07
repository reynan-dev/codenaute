import { SignOutButton } from 'pages/home/_components/sign-out-button';
import { useContext } from 'react';
import { HomePage } from './home.page';
import { useSignOut } from 'pages/home/home.service';
import AuthContext from 'context/auth/auth.context';

export const HomeContainer = () => {
	const { profile: profileData, isAuthenticated } = useContext(AuthContext);

	const { signOut } = useSignOut();

	return (
		<HomePage
			profileData={profileData}
			isAuthenticated={isAuthenticated}
			signOutButton={<SignOutButton signOut={signOut} />}
		/>
	);
};
