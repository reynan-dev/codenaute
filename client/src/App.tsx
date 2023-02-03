import CrossDeviceBackground from 'components/CrossDeviceBackground/CrossDeviceBackground';
import { EDITOR_PATH, HOME_PATH, SIGN_UP_PATH } from 'constants/paths';
import Editor from 'pages/editor/editor.page';
import { Home } from 'pages/home';
import { SignUp } from 'pages/signup';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'styles/toastify.css';

function App() {
	return (
		<>
			<CrossDeviceBackground />
			<div className='flex flex-col lg:h-full'>
				<Routes>
					<Route path={SIGN_UP_PATH} element={<SignUp />} />
					<Route path={HOME_PATH} element={<Home />} />
					<Route path={EDITOR_PATH} element={<Editor />} />
				</Routes>
				<ToastContainer theme='colored' />
			</div>
		</>
	);
}

export default App;
