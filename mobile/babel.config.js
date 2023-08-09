process.env.EXPO_ROUTER_APP_ROOT = '../../src/app';

module.exports = function (api) {
	api.cache(true);
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			'nativewind/babel',
			[
				'module-resolver',
				{
					alias: {
						styles: './src/styles',
						components: './src/components',
						assets: './src/assets',
						screens: './src/screens',
						gql: './src/gql',
						operations: './src/operations',
						hooks: './src/hooks'
					}
				}
			]
		]
	};
};
