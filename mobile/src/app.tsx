import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import useCachedResources from 'hooks/useCachedRessources';
import React from 'react';
import { LogBox, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LastProjects } from 'screens/last-projects';
import './styles/__generated__/nativewind-output';
import { Text } from 'react-native-svg';
import P from 'components/p';

export default function App() {
	LogBox.ignoreAllLogs();

	const GRAPHQL_API_URL = Constants?.expoConfig?.extra?.GRAPHQL_API_URL;

	console.log({ GRAPHQL_API_URL });

	const client = new ApolloClient({
		uri: GRAPHQL_API_URL,
		cache: new InMemoryCache()
	});

	const isLoadingComplete = useCachedResources();

	if (!isLoadingComplete) {
		return <P>PROUT</P>;
	} else {
		return (
			<SafeAreaProvider>
				<ApolloProvider client={client}>
					<View className='flex-1 bg-dark-900 text-white font-archivo'>
						<LastProjects />
						<StatusBar style='auto' />
					</View>
				</ApolloProvider>
			</SafeAreaProvider>
		);
	}
}

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		backgroundColor: '#fff',
// 		alignItems: 'center',
// 		justifyContent: 'center'
// 	}
// });
