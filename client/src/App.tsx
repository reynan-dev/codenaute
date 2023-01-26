import { Route, Routes } from 'react-router-dom';
import { SIGN_UP_PATH } from './constants/paths';
import { SignUp } from './pages/signup';

function App() {
	return (
		<>
			<Routes>
				<Route path={SIGN_UP_PATH} element={<SignUp />} />
			</Routes>
		</>
	);
}

export default App;
