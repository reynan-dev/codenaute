import { Button, SafeAreaView, TextInput, View } from 'react-native';

export interface SignInFormProps {
	isLoading: boolean;
	signIn: (email: string, password: string) => Promise<void>;
	state: {
		email: string;
		setEmail: React.Dispatch<React.SetStateAction<string>>;
		password: string;
		setPassword: React.Dispatch<React.SetStateAction<string>>;
	};
}

const style = {
	input: 'flex-1 border border-dark-600 h-10 rounded-lg w-5/6 px-4 py-6 text-white'
};

export const SignInForm = ({ isLoading, signIn, state }: SignInFormProps) => {
	return (
		<SafeAreaView className='w-full bg-dark'>
			<View className='flex flex-col items-center justify-center space-y-8'>
				<TextInput
					className={style.input}
					placeholder='Email'
					value={state.email}
					onChangeText={state.setEmail}
				/>

				<TextInput
					className={style.input}
					placeholder='Password'
					secureTextEntry
					value={state.password}
					onChangeText={state.setPassword}
				/>
			</View>

			<Button
				onPress={async (event) => {
					event.preventDefault();
					signIn(state.email, state.password);
				}}
				disabled={isLoading}
				// className='my-8'
				title='Sign in'
			/>
		</SafeAreaView>
	);
};
