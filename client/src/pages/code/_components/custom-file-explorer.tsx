import { SandpackFiles, useSandpack } from '@codesandbox/sandpack-react';
import { TreeNode, buildProjectTree } from 'helpers/format-file-path';
import React, { useEffect, useState } from 'react';
// import { formatFilePath } from 'helpers/format-file-path';
import { AiFillFolder, AiFillFolderOpen, AiOutlineFile } from 'react-icons/ai';
import { twMerge } from 'tailwind-merge';

interface CustomFileExplorerProps {
	className?: string;
	files: SandpackFiles | null;
}

// function getFilePaths(
// 	node: TreeNode,
// 	fileName: string,
// 	currentPath = '',
// 	paths: string[] = []
// ): string[] {
// 	const newPath = currentPath === '' ? node.name : `${currentPath}/${node.name}`;

// 	if (node.name === fileName) {
// 		paths.push(newPath);
// 	}

// 	if (node.children) {
// 		for (const child of node.children) {
// 			getFilePaths(child, fileName, newPath, paths);
// 		}
// 	}

// 	return paths;
// }

export const CustomFileExplorer = ({ className, files }: CustomFileExplorerProps) => {
	const { sandpack } = useSandpack();
	const [expandedNodes, setExpandedNodes] = useState<string[]>([]);

	console.log(sandpack.visibleFiles);

	const filePaths = files !== null ? Object.keys(files) : [];
	const filesTree = buildProjectTree(filePaths);

	// const hasVisibleFile = (node: TreeNode) => {
	// 	console.log('check visible');
	// 	return node.children
	// 		?.map((child) => sandpack.visibleFiles.includes(child.path))
	// 		.some((childHasVisibleFile) => childHasVisibleFile === true);
	// };

	// const hasVisibleChildren = (node: TreeNode): boolean => {
	// 	if (node.children) {
	// 		for (const child of node.children) {
	// 			if (sandpack.visibleFiles.includes(child.path)) {
	// 				return true;
	// 			}

	// 			if (hasVisibleChildren(child)) {
	// 				return true;
	// 			}
	// 		}
	// 	}

	// 	return false;
	// };

	// const isFileVisible = (filePath: string) => {
	// 	return sandpack.visibleFiles.includes(filePath)
	// }

	const style = { icons: 'mr-2' };

	// useEffect(() => {
	// 	setVisibleFiles(sandpack.visibleFiles)
	// }, [sandpack.visibleFiles])

	const renderNode = (node: TreeNode) => {
		const isExpanded = expandedNodes.includes(node.path);

		const toggleNode = (node: TreeNode) => {
			if (isExpanded) {
				setExpandedNodes(expandedNodes.filter((path) => path !== node.path));
			} else {
				setExpandedNodes((prevExpandedNodes) => [...prevExpandedNodes, node.path]);
			}
		};

		const handleFileClick = (node: TreeNode, event: React.MouseEvent) => {
			event.stopPropagation();
			console.log({ node });
			if (node.children !== undefined && node.children.length > 0) return toggleNode(node);
			sandpack.openFile(node.path);
		};

		return (
			<React.Fragment key={node.name}>
				<button
					className='flex items-center py-1 hover:text-primary-200'
					onClick={(event) => handleFileClick(node, event)}
				>
					{node.children && node.children.length > 0 ? (
						isExpanded ? (
							<AiFillFolderOpen className={style.icons} />
						) : (
							<AiFillFolder className={style.icons} />
						)
					) : (
						<AiOutlineFile className={style.icons} />
					)}
					<span>{node.name}</span>
				</button>

				{isExpanded &&
					node.children &&
					node.children.map((child) => (
						<button
							className='ml-4'
							key={child.name}
							onClick={(event) => handleFileClick(node, event)}
						>
							{renderNode(child)}
						</button>
					))}
			</React.Fragment>
		);
	};

	return (
		<div className={twMerge('bg-dark-900 px-3 py-3 text-dark-300', className)}>
			{filesTree.children && filesTree.children.map(renderNode)}
		</div>
	);
};
