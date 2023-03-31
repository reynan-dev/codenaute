import { ConditionalRoute } from 'components/ConditionalRoute/ConditionalRoute';
import CrossDeviceBackground from 'components/CrossDeviceBackground';
import Main from 'components/Main';
import NavBar from 'components/NavBar';
import { ACCOUNT_PATH, HOME_PATH, SIGN_IN_PATH, SIGN_UP_PATH } from 'constants/paths';
import AuthContext from 'context/auth.context';
import { Account } from 'pages/account';
import { Home } from 'pages/home';
import { SignIn } from 'pages/signIn';
import { SignUp } from 'pages/signUp';
import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'styles/toastify.css';

const App = () => {
	const { isAuthenticated } = useContext(AuthContext);

	return (
		<>
			<CrossDeviceBackground />
			<div className='flex flex-col md:h-full md:flex-row'>
				{isAuthenticated && <NavBar className='fixed z-50' />}
				<Main>
					<Routes>
						<Route path={HOME_PATH} element={<Home />} />

						<Route
							path={SIGN_UP_PATH}
							element={
								<ConditionalRoute type='unauth'>
									<SignUp />
								</ConditionalRoute>
							}
						/>

						<Route
							path={SIGN_IN_PATH}
							element={
								<ConditionalRoute type='unauth'>
									<SignIn />
								</ConditionalRoute>
							}
						/>

						<Route
							path={ACCOUNT_PATH}
							element={
								<ConditionalRoute type='private'>
									<Account />
								</ConditionalRoute>
							}
						/>
					</Routes>
					<ToastContainer theme='colored' />
				</Main>
			</div>
		</>
	);
};

export default App;
