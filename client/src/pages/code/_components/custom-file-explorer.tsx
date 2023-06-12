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

function getFilePaths(
	node: TreeNode,
	fileName: string,
	currentPath = '',
	paths: string[] = []
): string[] {
	const newPath = currentPath === '' ? node.name : `${currentPath}/${node.name}`;

	if (node.name === fileName) {
		paths.push(newPath);
	}

	if (node.children) {
		for (const child of node.children) {
			getFilePaths(child, fileName, newPath, paths);
		}
	}

	return paths;
}

export const CustomFileExplorer = ({ className, files }: CustomFileExplorerProps) => {
	const { sandpack } = useSandpack();

	// console.log(sandpack.visibleFiles)

	const filePaths = files !== null ? Object.keys(files) : [];
	const filesTree = buildProjectTree(filePaths);

	const style = { icons: 'mr-2' };

	const handleFileClick = (node: TreeNode) => {
		if (node.children !== undefined && node.children.length > 0) return;
		sandpack.openFile(node.path);
	};

	const hasVisibleFile = (node: TreeNode) => {
		console.log('check visible');
		return node.children
			?.map((child) => sandpack.visibleFiles.includes(child.path))
			.some((childHasVisibleFile) => childHasVisibleFile === true);
	};

	// useEffect(() => {
	// 	setVisibleFiles(sandpack.visibleFiles)
	// }, [sandpack.visibleFiles])

	const renderNode = (node: TreeNode) => {
		return (
			<React.Fragment key={node.name}>
				<button
					className='flex items-center py-1 hover:text-primary-200'
					onClick={() => handleFileClick(node)}
				>
					{node.children && node.children.length > 0 ? (
						hasVisibleFile(node) ? (
							<AiFillFolderOpen className={style.icons} />
						) : (
							<AiFillFolder className={style.icons} />
						)
					) : (
						<AiOutlineFile className={style.icons} />
					)}
					<span>{node.name}</span>
				</button>
				{node.children &&
					node.children.map((child) => (
						<button className='ml-4' key={child.name} onClick={() => handleFileClick(node)}>
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
