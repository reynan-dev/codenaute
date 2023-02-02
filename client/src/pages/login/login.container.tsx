import LoginPage from 'pages/login/login.page';
import LoginForm from 'pages/login/sections/LoginForm';
import { useState } from 'react';

export interface ErrorMessages {
	[key: string]: string;
}

export default function LoginContainer() {
	const [usernameOrEmail, setUsernameOrEmail] = useState('');
	const [password, setPassword] = useState('');

	const state = {
		usernameOrEmail,
		setUsernameOrEmail,
		password,
		setPassword,
	};

	// const navigate = useNavigate();

	const submit = async () => {
		// try {
		// 	await login({
		// 		variables: { usernameOrEmail, password }
		// 	});
		// 	toast.success(`Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter.`);
		// 	navigate(HOME_PATH);
		// } catch (error) {
		// 	toast.error(getGraphQLErrorMessage(error), { autoClose: 10000 });
		// }
	};

	return (
		<LoginPage
			loginForm={<LoginForm isLoading={loading} handleForm={submit} state={state} />}
		/>
	);
}
