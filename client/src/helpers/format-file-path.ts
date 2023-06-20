export interface TreeNode {
	name: string;
	children?: TreeNode[];
	path: string;
}

export function buildProjectTree(filePaths: string[]): TreeNode {
	const root: TreeNode = {
		name: '',
		path: '',
		children: []
	};

	filePaths.forEach((filePath) => {
		const segments = filePath.split('/').filter((segment) => segment !== '');
		let currentNode = root;
		let currentPath = '';

		segments.forEach((segment) => {
			currentPath += `/${segment}`;

			let childNode = currentNode.children?.find((node) => node.name === segment);

			if (!childNode) {
				childNode = {
					name: segment,
					path: currentPath,
					children: []
				};
				currentNode.children?.push(childNode);
			}

			currentNode = childNode;
		});
	});

	return root;
}
