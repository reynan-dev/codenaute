/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin');
const COLORS = require('./src/styles/colors');

module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: COLORS.PRIMARY.DEFAULT,
					100: COLORS.PRIMARY.DEFAULT
				},
				secondary: {
					DEFAULT: COLORS.SECONDARY.DEFAULT
				},
				success: {
					DEFAULT: COLORS.SUCCESS.DEFAULT
				},
				warning: {
					DEFAULT: COLORS.WARNING.DEFAULT
				},
				danger: {
					DEFAULT: COLORS.DANGER.DEFAULT
				},
				black: {
					DEFAULT: COLORS.BLACK.DEFAULT
				},
				white: {
					DEFAULT: COLORS.WHITE.DEFAULT
				},
				dark: {
					DEFAULT: COLORS.DARK.DEFAULT,
					300: COLORS.DARK[300],
					500: COLORS.DARK[500],
					600: COLORS.DARK[600],
					700: COLORS.DARK[700],
					800: COLORS.DARK[800],
					900: COLORS.DARK[900]
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
		plugin(require('./src/styles/plugins/colorVarsExtractor'))
	]
};
