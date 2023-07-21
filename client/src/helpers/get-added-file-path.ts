import { SandpackFiles } from '@codesandbox/sandpack-react/types';

export const getAddedFilePath = (
	oldFiles: SandpackFiles | null,
	newFiles: SandpackFiles
): string | null => {
	const newPaths = Object.keys(newFiles);
	for (const path of newPaths) {
		if (oldFiles !== null && !(path in oldFiles)) {
			return path;
		}
	}
	return null;
};
