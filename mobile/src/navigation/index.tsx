/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthContext from 'context/auth/auth.context';
import linking from 'navigation/linking-config';
import * as React from 'react';
import { ColorSchemeName, Pressable, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Account } from 'screens/account';
import { SignIn } from 'screens/sign-in';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from 'types';

export default function Navigation() {
	return (
		<NavigationContainer
			linking={linking}
			// theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
		>
			<RootNavigator />
		</NavigationContainer>
	);
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
	const { isAuthenticated, profile } = React.useContext(AuthContext);

	return (
		<Stack.Navigator>
			{!isAuthenticated ? (
				<Stack.Screen name='SignIn' component={SignIn} options={{ headerShown: false }} />
			) : (
				<Stack.Screen name='Root' component={BottomTabNavigator} options={{ headerShown: false }} />
			)}

			{/* <Stack.Screen name='SignIn' component={SignIn} options={{ headerShown: false }} /> */}

			{/* <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      /> */}
			{/* <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group> */}
		</Stack.Navigator>
	);
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
	const colorScheme = useColorScheme();

	return (
		<BottomTab.Navigator
			initialRouteName='Account'
			//   screenOptions={{
			//     tabBarActiveTintColor: Colors[colorScheme].tint,
			//   }}
		>
			<BottomTab.Screen
				name='Account'
				component={Account}
				options={({ navigation }: RootTabScreenProps<'Account'>) => ({
					title: 'Account',
					tabBarIcon: ({ color }) => <TabBarIcon name='users' color={color} />
					//   headerRight: () => (
					//     <Pressable
					//       onPress={() => navigation.navigate("Modal")}
					//       style={({ pressed }) => ({
					//         opacity: pressed ? 0.5 : 1,
					//       })}
					//     >
					//       <FontAwesome
					//         name="info-circle"
					//         size={25}
					//         color={Colors[colorScheme].text}
					//         style={{ marginRight: 15 }}
					//       />
					//     </Pressable>
					//   ),
				})}
			/>
			{/* <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={{
          title: "Tab Two",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      /> */}
		</BottomTab.Navigator>
	);
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
	name: React.ComponentProps<typeof FontAwesome>['name'];
	color: string;
}) {
	return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
