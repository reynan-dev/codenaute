import { SignInFormProps } from 'screens/sign-in/_components/sign-in-form';
import { SignInState } from 'screens/sign-in/sign-in.container';

interface SignInScreenProps {
	signInForm: JSX.Element;
	// signIn: (email: string, password: string) => Promise<void>;
	// state: SignInState;
}

export const SignInScreen = ({ signInForm }: SignInScreenProps) => {
	return <>{signInForm}</>;
};
