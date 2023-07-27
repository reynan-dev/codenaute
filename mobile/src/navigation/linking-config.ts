/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import { RootStackParamList } from 'types';
import * as Linking from 'expo-linking';

const linking: LinkingOptions<RootStackParamList> = {
	prefixes: [Linking.createURL('/')],
	config: {
		screens: {
			Root: {
				screens: {
					Account: {
						screens: {
							AccountScreen: 'one'
						}
					},
					SignIn: {
						screens: {
							SignInScreen: 'two'
						}
					}
				}
			},
			Modal: 'modal',
			NotFound: '*'
		}
	}
};

export default linking;
