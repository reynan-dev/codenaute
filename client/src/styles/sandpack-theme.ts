import { SandpackTheme } from '@codesandbox/sandpack-react/types';
import COLORS from 'styles/colors';

export const sandpackCustomTheme: SandpackTheme = {
	colors: {
		surface1: COLORS.DARK[900],
		surface2: COLORS.DARK[700],
		surface3: COLORS.DARK[700],
		clickable: COLORS.DARK[500],
		base: COLORS.WHITE.DEFAULT,
		disabled: COLORS.DARK[500],
		hover: COLORS.PRIMARY[200],
		accent: COLORS.PRIMARY[200],
		error: COLORS.DANGER.DEFAULT
		// errorSurface: COLORS.DANGER[100]
	},
	syntax: {
		plain: COLORS.WHITE.DEFAULT,
		comment: {
			color: COLORS.SUCCESS[100],
			fontStyle: 'italic'
		},
		keyword: COLORS.WARNING.DEFAULT,
		tag: '#d28cf6',
		punctuation: COLORS.WHITE.DEFAULT,
		definition: COLORS.PRIMARY[200],
		property: COLORS.PRIMARY[300],
		static: COLORS.DANGER.DEFAULT,
		string: COLORS.WHITE.DEFAULT
	},
	font: {
		body: 'Archivo, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
		mono: '"Fira Mono", "DejaVu Sans Mono", Menlo, Consolas, "Liberation Mono", Monaco, "Lucida Console", monospace',
		size: '14px',
		lineHeight: '20px'
	}
};
