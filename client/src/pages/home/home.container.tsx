import AuthContext from 'context/auth.context';
import { useContext } from 'react';
import { HomePage } from './home.page';

export const HomeContainer = () => {
	const { profile: profileData, isAuthenticated} = useContext(AuthContext)

	return <HomePage profileData={profileData} isAuthenticated={isAuthenticated} />;
};
