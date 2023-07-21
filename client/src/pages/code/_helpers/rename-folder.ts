import { SandpackFiles } from '@codesandbox/sandpack-react/types';
import { TreeNode } from 'helpers/format-file-path';
import { ProjectContextData, SetProjectContextData } from 'types/project';

export const renameFolder = (
	node: TreeNode,
	setFilesTree: React.Dispatch<React.SetStateAction<TreeNode | null>>,
	files: SandpackFiles,
	setCurrentProjectData: SetProjectContextData,
	newFolderName: string | null
) => {
	if (node.children === undefined || node.children.length === 0) {
		return;
	}

	if (newFolderName && newFolderName.trim() !== '') {
		const parentPath = node.path.substring(0, node.path.lastIndexOf('/'));
		const newPath = `${parentPath}/${newFolderName}`;

		const renamedFiles = { ...files };
		const renamedChildren = node.children.map((child) => {
			const updatedPath = child.path.replace(node.path, newPath);
			renamedFiles[updatedPath] = renamedFiles[child.path];
			delete renamedFiles[child.path];

			return { ...child, path: updatedPath };
		});

		node.name = newFolderName;
		node.path = newPath;
		node.children = renamedChildren;

		setFilesTree((prevFilesTree) => {
			if (prevFilesTree) {
				return { ...prevFilesTree };
			}
			return null;
		});

		setCurrentProjectData(
			(previousState) =>
				({
					...previousState,
					files: renamedFiles
				} as ProjectContextData)
		);
	}
};
