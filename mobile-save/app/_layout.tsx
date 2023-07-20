import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import Constants from 'expo-constants';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary
} from 'expo-router';

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: '(tabs)'
};

export default function RootLayout() {
	const [loaded, error] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
		...FontAwesome.font
	});

	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		if (error) throw error;
	}, [error]);

	return (
		<>
			{/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
			{!loaded && <SplashScreen />}
			{loaded && <RootLayoutNav />}
		</>
	);
}

function RootLayoutNav() {
	const colorScheme = useColorScheme();

	const GRAPHQL_API_URL = Constants?.expoConfig?.extra?.GRAPHQL_API_URL;

	const client = new ApolloClient({
		uri: GRAPHQL_API_URL,
		cache: new InMemoryCache()
	});

	// if (!isLoadingComplete) {
	//   return null;
	// } else {
	return (
		// <>
		// 	<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
		// 		<Stack>
		// 			<Stack.Screen name='(tabs)' options={{ headerShown: false }} />
		// 			<Stack.Screen name='modal' options={{ presentation: 'modal' }} />
		// 		</Stack>
		// 	</ThemeProvider>
		// </>
		<SafeAreaProvider>
			<ApolloProvider client={client}>
				<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
					<Stack>
						<Stack.Screen name='(tabs)' options={{ headerShown: false }} />
						<Stack.Screen name='modal' options={{ presentation: 'modal' }} />
					</Stack>
				</ThemeProvider>
			</ApolloProvider>
		</SafeAreaProvider>
	);
}
