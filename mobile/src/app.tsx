import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { LogBox, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { twMerge } from 'tailwind-merge';
import './styles/__generated__/nativewind-output';
import { Members } from 'components/members';
import COLORS from 'styles/colors';
import { LastProjects } from 'screens/last-projects';

export default function App() {
	LogBox.ignoreAllLogs();

	const GRAPHQL_API_URL = Constants?.expoConfig?.extra?.GRAPHQL_API_URL;

	console.log({ GRAPHQL_API_URL });

	const client = new ApolloClient({
		uri: GRAPHQL_API_URL,
		cache: new InMemoryCache()
	});

	return (
		<SafeAreaProvider>
			<ApolloProvider client={client}>
				<View style={styles.container}>
					<LastProjects />
					<StatusBar style='auto' />
				</View>
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
