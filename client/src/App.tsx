import CrossDeviceBackground from 'components/CrossDeviceBackground';
import { HOME_PATH, SIGN_UP_PATH } from 'constants/paths';
import { Home } from 'pages/home';
import { SignUp } from 'pages/signup';
import { Route, Routes } from 'react-router-dom';


function App() {
	return (
		<>
			<CrossDeviceBackground />
			<div className='flex flex-col lg:h-full'>
				<Routes>
					<Route path={SIGN_UP_PATH} element={<SignUp />} />
					<Route path={HOME_PATH} element={<Home />} />
				</Routes>
			</div>
		</>
	);
}

export default App;
