import { useProfile } from 'api/profile/useProfile';
import CrossDeviceBackground from 'components/CrossDeviceBackground';
import { ConditionalRoute } from 'components/ConditionalRoute/ConditionalRoute';
import { ACCOUNT_PATH, HOME_PATH, LOGIN_PATH, SIGN_UP_PATH } from 'constants/paths';
import { Account } from 'pages/account';
import { Home } from 'pages/home';
import { SignIn } from 'pages/signIn';
import { SignUp } from 'pages/signUp';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'styles/toastify.css';

const App = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const {
		loading: isProfileLoading,
		refetch: refetchProfile,
		data: profileData
	} = useProfile(setIsAuthenticated);

	return (
		<>
			<CrossDeviceBackground />
			<div className='flex flex-col lg:h-full'>
				<Routes>
					<Route
						path={HOME_PATH}
						element={<Home isAuthenticated={isAuthenticated} profileData={profileData} />}
					/>

					<Route
						path={SIGN_UP_PATH}
						element={
							<ConditionalRoute type='unauth' isAuthenticated={isAuthenticated}>
								<SignUp />
							</ConditionalRoute>
						}
					/>

					<Route
						path={LOGIN_PATH}
						element={
							<ConditionalRoute type='unauth' isAuthenticated={isAuthenticated}>
								<SignIn refetchProfile={refetchProfile} />
							</ConditionalRoute>
						}
					/>

					<Route
						path={ACCOUNT_PATH}
						element={
							<ConditionalRoute type='private' isAuthenticated={isAuthenticated}>
								<Account />
							</ConditionalRoute>
						}
					/>
				</Routes>
				<ToastContainer theme='colored' />
			</div>
		</>
	);
};

export default App;
