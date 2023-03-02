export const areSameValues = (
	initialData: Record<string, unknown>,
	newData: Record<string, unknown>
): boolean => {
	const initialDataKeys = Object.keys(initialData);
	const newDataKeys = Object.keys(newData);
	const haveSameNumberOfKeys = initialDataKeys.length === newDataKeys.length;

	if (!haveSameNumberOfKeys) {
		return true;
	}

	for (const key of initialDataKeys) {
		const initialDataValue = initialData[key];
		const newDataValue = newData[key];

		if (initialDataValue !== newDataValue) {
			return false;
		}
	}

	return true;
};
