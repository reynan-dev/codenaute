import ConditionalRoute from 'components/conditionnal-route';
import CrossDeviceBackground from 'components/cross-device-background';
import { HOME_PATH, SIGN_UP_PATH, SIGN_IN_PATH, ACCOUNT_PATH, CODE_PATH } from 'constants/paths';
import { Account } from 'pages/account';
import { Code } from 'pages/code';
import { Home } from 'pages/home';
import { SignIn } from 'pages/sign-in';
import { SignUp } from 'pages/sign-up';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'styles/toastify.css';

const App = () => {
	return (
		<>
			<CrossDeviceBackground />
			<div className='flex flex-col lg:h-full'>
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

					<Route
						path={CODE_PATH}
						element={
							<ConditionalRoute type='private'>
								<Code />
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
