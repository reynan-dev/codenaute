import { SandpackState } from '@codesandbox/sandpack-react/index';
import { TreeNode } from 'helpers/format-file-path';

export const renameFile = (newName: string, oldNode: TreeNode, sandpack: SandpackState): void => {
	const parentPath = oldNode.path.split('/').slice(0, -1).join('/');
	const code = oldNode.code;

	sandpack.closeFile(oldNode.path);
	sandpack.deleteFile(oldNode.path);

	sandpack.addFile(`${parentPath}/${newName}`, code);
	sandpack.openFile(`${parentPath}/${newName}`);
};
