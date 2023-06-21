import { SandpackFiles } from '@codesandbox/sandpack-react/index';

export interface TreeNode {
	name: string;
	children?: TreeNode[];
	path: string;
	code: string;
}

export function buildProjectTree(files: SandpackFiles): TreeNode {
	const filePaths =
		files !== null
			? Object.entries(files).map(([path, file]) => {
					if (typeof file === 'string') {
						return { path, code: file };
					} else {
						return { path, code: file.code };
					}
			  })
			: [];

	const root: TreeNode = {
		name: '',
		path: '',
		code: '',
		children: []
	};

	filePaths.forEach((filePath) => {
		const segments = filePath.path.split('/').filter((segment) => segment !== '');
		let currentNode = root;
		let currentPath = '';

		segments.forEach((segment) => {
			currentPath += `/${segment}`;

			let childNode = currentNode.children?.find((node) => node.name === segment);

			if (!childNode) {
				childNode = {
					name: segment,
					path: currentPath,
					code: '',
					children: []
				};
				currentNode.children?.push(childNode);
			}

			if (currentPath === filePath.path) {
				childNode.code = filePath.code;
			}

			currentNode = childNode;
		});
	});

	return root;
}
