module.exports = function (api) {
	api.cache(true);
	return {
		presets: ['babel-preset-expo'],
		plugins: [require.resolve('expo-router/babel'), 'nativewind/babel'][
			('module-resolver',
			{
				alias: {
					styles: './styles',
					components: './components',
					constants: './constants',
					app: './app',
					__graphql__: './__graphql__',
					operations: './operations'
				}
			})
		]
	};
};
