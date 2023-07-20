import { StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import COLORS from 'styles/colors';
import { useMutation } from '@apollo/client';
import { CREATE_PROJECT_MUTATION } from 'operations/create-project/create-project.graphql';
import { CreateProjectMutation, CreateProjectMutationVariables } from '__graphql__/graphql';

export default async function TabTwoScreen() {
	console.log('prout2');

	// const [createProjectMutation, { data, loading }] = useMutation<
	// 	CreateProjectMutation,
	// 	CreateProjectMutationVariables
	// >(CREATE_PROJECT_MUTATION);

	// await createProjectMutation({
	// 	variables: {
	// 		name: 'untitled',
	// 		memberId: '1303de4d-8afd-4c4b-a1b4-c742e11ea627	',
	// 		isTemplate: false,
	// 		isPublic: false,
	// 		sandpackTemplate: 'react-ts',
	// 		// environment: 'create-react-app',
	// 		// main: '/App.tsx',
	// 		files: JSON.stringify({})
	// 	},
	// 	onCompleted(data) {
	// 		console.log({ data });
	// 	},
	// 	onError(error) {
	// 		console.log({ error });
	// 	}
	// });

	return (
		<View style={styles.container}>
			{/* <Text className={twMerge('text-yellow-500', 'font-bold', 'bg-primary')}>Tab Two</Text> */}
			<Text style={{ backgroundColor: COLORS.SECONDARY['DEFAULT'] }}>Tab Two</Text>
			<View style={styles.separator} lightColor='#eee' darkColor='rgba(255,255,255,0.1)' />
			<EditScreenInfo path='app/(tabs)/two.tsx' />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold'
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: '80%'
	}
});
