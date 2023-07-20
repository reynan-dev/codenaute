import { StatusBar } from 'expo-status-bar';
import { LogBox, StyleSheet, Text, View } from 'react-native';
import COLORS from './styles/colors';
import { twMerge } from 'tailwind-merge';
import './styles/__generated__/nativewind-output';

export default function App() {
	LogBox.ignoreAllLogs();

	return (
		<View style={styles.container}>
			<Text className={twMerge('text-yellow-500', 'font-bold', 'bg-primary')}>
				Open up App.tsx to start working on your app!
			</Text>
			<Text style={{ backgroundColor: COLORS.SECONDARY['DEFAULT'] }}>
				Open up App.tsx to start working on your app!
			</Text>
			<StatusBar style='auto' />
		</View>
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
