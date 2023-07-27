import {
	ApolloClient,
	ApolloLink,
	ApolloProvider,
	InMemoryCache,
	createHttpLink
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext, { AuthProvider } from 'context/auth/auth.context';
import cookie from 'cookie';
import Constants from 'expo-constants';
import Navigation from 'navigation';
import React, { useContext } from 'react';
import { LogBox, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SignIn } from 'screens/sign-in';
import './styles/__generated__/nativewind-output';

export default function App() {
	LogBox.ignoreAllLogs();

	const GRAPHQL_API_URL = Constants?.expoConfig?.extra?.GRAPHQL_API_URL;

	const authMiddleware = new ApolloLink((operation, forward) => {
		return forward(operation).map((response) => {
			const context = operation.getContext();
			const cookies = context.response.headers.get('Set-Cookie');
			if (cookies) {
				const sessionId = cookie.parse(cookies);
				console.log({ sessionId });
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
				<AuthProvider>
					<Navigation />
				</AuthProvider>
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
