import { SandpackFile, SandpackFiles } from '@codesandbox/sandpack-react/index';

export const hasSandpackFilesChanged = (obj1: SandpackFiles, obj2: SandpackFiles): boolean => {
	const keys1 = Object.keys(obj1);
	const keys2 = Object.keys(obj2);

	if (keys1.length !== keys2.length || !keys1.every((key) => keys2.includes(key))) {
		return true;
	}

	for (const key of keys1) {
		const value1 = obj1[key];
		const value2 = obj2[key];

		if (!isSandpackFileEqual(value1, value2)) {
			return true;
		}
	}

	return false;
};

export const hasMainFileChanged = (previous: string, current: string): boolean => {
	return previous !== current;
};

const isSandpackFileEqual = (
	file1: string | SandpackFile,
	file2: string | SandpackFile
): boolean => {
	if (typeof file1 !== typeof file2) {
		return false;
	}

	if (typeof file1 === 'string') {
		return file1 === file2;
	}

	const sandpackFile1 = file1 as SandpackFile;
	const sandpackFile2 = file2 as SandpackFile;

	return (
		sandpackFile1.code === sandpackFile2.code &&
		(sandpackFile1.hidden === sandpackFile2.hidden ||
			(sandpackFile1.hidden === undefined && sandpackFile2.hidden === undefined)) &&
		(sandpackFile1.active === sandpackFile2.active ||
			(sandpackFile1.active === undefined && sandpackFile2.active === undefined)) &&
		(sandpackFile1.readOnly === sandpackFile2.readOnly ||
			(sandpackFile1.readOnly === undefined && sandpackFile2.readOnly === undefined))
	);
};
