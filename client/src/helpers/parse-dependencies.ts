import { SandpackFiles } from '@codesandbox/sandpack-react/index';
import { mapFilePaths } from 'helpers/map-file-paths';

export const parseDependencies = (files: SandpackFiles | undefined) => {
	const filePaths = mapFilePaths(files);
	const packageJson = filePaths.filter((file) => file.path === '/package.json')[0];
	const packageJsonCode = packageJson !== undefined ? packageJson.code : undefined;

	if (packageJsonCode === undefined)
		return {
			dependencies: undefined,
			devDependencies: undefined
		};

	return {
		dependencies: JSON.parse(packageJsonCode ?? '').dependencies,
		devDependencies: JSON.parse(packageJsonCode ?? '').devDependencies
	};
};
