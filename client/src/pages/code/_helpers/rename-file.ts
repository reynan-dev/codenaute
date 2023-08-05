import { SandpackState } from '@codesandbox/sandpack-react/index';
import { TreeNode } from 'helpers/format-file-path';

export const renameFile = (newName: string, oldNode: TreeNode, sandpack: SandpackState): void => {
	const parentPath = oldNode.path.split('/').slice(0, -1).join('/');

	sandpack.closeFile(oldNode.path);
	sandpack.deleteFile(oldNode.path);

	sandpack.addFile(`${parentPath}/${newName}`, oldNode.code);
	sandpack.openFile(`${parentPath}/${newName}`);
	sandpack.setActiveFile(`${parentPath}/${newName}`);
};
