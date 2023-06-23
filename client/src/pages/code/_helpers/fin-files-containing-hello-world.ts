import { SandpackFiles } from '@codesandbox/sandpack-react/index';

export function findFilesWithCodeContainingHelloWorld(files: SandpackFiles): string[] {
	const filePaths: string[] = [];

	for (const filePath in files) {
		const fileContent = files[filePath];

		if (typeof fileContent === 'string' && fileContent.includes('Hello World')) {
			filePaths.push(filePath);
		} else if (typeof fileContent === 'object' && fileContent.code.includes('Hello World')) {
			filePaths.push(filePath);
		}
	}

	return filePaths;
}
