module.exports = ({ addBase, theme }) => {
	const extractColorVars = (colorObj, colorGroup = '') => {
		return Object.keys(colorObj).reduce((vars, colorKey) => {
			const value = colorObj[colorKey];
			const cssVariable =
				colorKey === 'DEFAULT' ? `--color${colorGroup}` : `--color${colorGroup}-${colorKey}`;

			const newVars =
				typeof value === 'string'
					? { [cssVariable]: value }
					: extractColorVars(value, `-${colorKey}`);

			return { ...vars, ...newVars };
		}, {});
	}

	addBase({
		':root': extractColorVars(theme('colors'))
	});
};
