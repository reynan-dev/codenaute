import { TreeNode } from 'helpers/format-file-path';

export const isChildNode = (child: TreeNode, parent?: TreeNode) => {
	const isChild = (child: TreeNode, parent: TreeNode): boolean => {
		if (!parent.children) {
			return false;
		}

		return parent.children.some((node) => node === child || isChild(child, node));
	};

	return parent ? isChild(child, parent) : false;
};
