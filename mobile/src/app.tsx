import {
	ApolloClient,
	ApolloLink,
	ApolloProvider,
	InMemoryCache,
	createHttpLink
} from '@apollo/client';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { LogBox, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { twMerge } from 'tailwind-merge';
import './styles/__generated__/nativewind-output';
import { Members } from 'components/members';
import COLORS from 'styles/colors';
import cookie from 'cookie';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setContext } from '@apollo/client/link/context';
import { SignIn } from 'screens/sign-in';

export default function App() {
	LogBox.ignoreAllLogs();

	const GRAPHQL_API_URL = Constants?.expoConfig?.extra?.GRAPHQL_API_URL;

	const authMiddleware = new ApolloLink((operation, forward) => {
		return forward(operation).map((response) => {
			const context = operation.getContext();
			const cookies = context.response.headers.get('Set-Cookie');
			if (cookies) {
				const sessionId = cookie.parse(cookies);
				const setCookie = cookie.serialize('sessionId', sessionId.sessionId);
				console.info(setCookie, 'set-cookie');
				AsyncStorage.setItem('Cookie', setCookie);
			}
			return response;
		});
	});

	const authLink = setContext(async (_, { headers }) => {
		const sessionId = await AsyncStorage.getItem('Cookie');
		console.info(sessionId, '@@@ sessionId in authLink');
		return {
			headers: {
				...headers,
				Cookie: sessionId
			}
		};
	});

	const httpLink = createHttpLink({
		uri: GRAPHQL_API_URL
	});

	const client = new ApolloClient({
		link: authLink.concat(authMiddleware).concat(httpLink),
		cache: new InMemoryCache()
	});

	return (
		<SafeAreaProvider>
			<ApolloProvider client={client}>
				{/* <View style={styles.container}>
					<Text className={twMerge('text-yellow-500', 'font-bold', 'bg-black')}>
						Open up App.tsx to start working on your app!
					</Text>
					<Text style={{ backgroundColor: COLORS.SECONDARY['DEFAULT'] }}>
						Open up App.tsx to start working on your app!
					</Text>
					<Members />
					<StatusBar style='auto' />
				</View> */}
				<SignIn />
			</ApolloProvider>
		</SafeAreaProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
