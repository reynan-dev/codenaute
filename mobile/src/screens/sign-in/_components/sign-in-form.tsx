import { Button, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';

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
	input: 'border border-dark-600 rounded-lg w-5/6 px-4 py-6 text-white'
};

export const SignInForm = ({ isLoading, signIn, state }: SignInFormProps) => {
	return (
		<SafeAreaView className='w-full bg-dark h-full flex-col justify-center space-y-12'>
			<View className='flex flex-col items-center justify-center space-y-8'>
				<TextInput
					className={style.input}
					placeholder='Email'
					value={state.email.toLowerCase()}
					onChangeText={state.setEmail}
					keyboardType='email-address'
					editable
				/>

				<TextInput
					className={style.input}
					placeholder='Password'
					secureTextEntry
					value={state.password}
					onChangeText={(text) => state.setPassword(text)}
				/>
			</View>

			<TouchableOpacity
				className='bg-primary rounded-full h-16 w-5/6 mx-auto flex justify-center items-center'
				onPress={async (event) => {
					event.preventDefault();
					signIn(state.email, state.password);
				}}
				disabled={isLoading}
			>
				<Text className='text-black text-xl font-bold'>Sign In</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
};
