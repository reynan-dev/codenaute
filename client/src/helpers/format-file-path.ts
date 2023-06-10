// interface Tree {
// 	name: string;
// 	children?: Tree[];
// }

// export const formatFilePath = (filePath: string): Tree => {
// 	const segments = filePath.split('/').filter((segment) => segment !== '');

// 	const root: Tree = {
// 		name: '',
// 		children: []
// 	};

// 	let currentNode = root;

// 	segments.forEach((segment) => {
// 		const newNode: Tree = {
// 			name: segment,
// 			children: []
// 		};

// 		currentNode.children?.push(newNode);
// 		currentNode = newNode;
// 	});

// 	return root;
// };

interface TreeNode {
	name: string;
	children?: TreeNode[];
}

export function buildProjectTree(filePaths: string[]): TreeNode {
	const root: TreeNode = {
		name: '',
		children: []
	};

	filePaths.forEach((filePath) => {
		const segments = filePath.split('/').filter((segment) => segment !== '');
		let currentNode = root;

		segments.forEach((segment) => {
			let childNode = currentNode.children?.find((node) => node.name === segment);

			if (!childNode) {
				childNode = {
					name: segment,
					children: []
				};
				currentNode.children?.push(childNode);
			}

			currentNode = childNode;
		});
	});

	return root;
}
