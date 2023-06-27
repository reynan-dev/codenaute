import { SandpackFiles } from '@codesandbox/sandpack-react/index';
import { mapFilePaths } from 'helpers/map-file-paths';

export const parseDependencies = (files: SandpackFiles | undefined) => {
	const filePaths = mapFilePaths(files);
	const packageJsonCode = filePaths.filter((file) => file.path === '/package.json')[0].code;

	return {
		dependencies: JSON.parse(packageJsonCode ?? '').dependencies,
		devDependencies: JSON.parse(packageJsonCode ?? '').devDependencies
	};
};
