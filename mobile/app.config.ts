import { ExpoConfig } from 'expo/config';
import COLORS from './src/styles/colors';
import 'dotenv/config';

// In SDK 46 and lower, use the following import instead:
// import { ExpoConfig } from '@expo/config-types';

const config: ExpoConfig = {
	extra: {
		GRAPHQL_API_URL: process.env.SERVER_URL || '/graphql'
	},
	name: 'Codenaute',
	slug: 'codenaute',
	version: '1.0.0',
	orientation: 'portrait',
	icon: './src/assets/icon.png',
	userInterfaceStyle: 'light',
	splash: {
		image: './src/assets/splash.png',
		resizeMode: 'contain',
		backgroundColor: COLORS.DARK[900]
	},
	assetBundlePatterns: ['**/*'],
	ios: {
		supportsTablet: true
	},
	android: {
		adaptiveIcon: {
			foregroundImage: './src/assets/adaptive-icon.png',
			backgroundColor: COLORS.DARK[900]
		}
	},
	web: {
		favicon: './src/assets/favicon.png'
	}
};

export default config;
