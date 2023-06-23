import { SandpackFiles } from '@codesandbox/sandpack-react/index';

export function getUnnecessaryFiles(files1: SandpackFiles, files2: SandpackFiles): string[] {
	const normalizedPaths1 = Object.keys(files1).map((filePath) => filePath.replace(/^\//, ''));
	const normalizedPaths2 = Object.keys(files2).map((filePath) => filePath.replace(/^\//, ''));

	const missingPaths: string[] = normalizedPaths1.filter(
		(filePath) => !normalizedPaths2.includes(filePath)
	);

	return missingPaths.map((filePath) => `/${filePath}`);
}
