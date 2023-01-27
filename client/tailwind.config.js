/** @type {import('tailwindcss').Config} */

// const plugin = require('tailwindcss/plugin');

module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: '#44A5FE',
					100: '#7ec0fc'
				},
				secondary: {
					DEFAULT: '#8B77E2'
				},
				success: {
					DEFAULT: '#28AF65'
				},
				warning: {
					DEFAULT: '#F1DB4B'
				},
				danger: {
					DEFAULT: '#F76958'
				},
				black: {
					DEFAULT: '#0C0D10'
				},
				white: {
					DEFAULT: '#F2F2F2'
				},
				dark: {
					DEFAULT: '#131416',
					300: '#A0A4AD',
					500: '#545861',
					600: '#35373E',
					700: '#27292E',
					800: '#202225',
					900: '#18191B'
				}
			},
			fontFamily: {
				archivo: ['Archivo']
			},
			minWidth: {
				56: '14rem'
			}
		}
	},
	plugins: [
		require('tailwindcss'),
		require('autoprefixer'),
		require('./src/styles/plugins/colorVarsExtractor')
	]
};
