import { SandpackFiles } from '@codesandbox/sandpack-react/index';

export const mapFilePaths = (files: SandpackFiles | undefined) => {
	return files !== undefined
		? Object.entries(files).map(([path, file]) => {
				if (typeof file === 'string') {
					return { path, code: file };
				} else {
					return { path, code: file.code };
				}
		  })
		: [];
};
