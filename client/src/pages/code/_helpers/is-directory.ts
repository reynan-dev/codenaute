import { TreeNode } from 'helpers/format-file-path';

export const isDirectory = (node: TreeNode): boolean => {
	return node.children !== undefined && node.children.length > 0;
};
