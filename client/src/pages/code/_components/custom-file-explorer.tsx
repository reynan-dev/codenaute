import { SandpackFiles, useSandpack } from '@codesandbox/sandpack-react';
import { TreeNode, buildProjectTree } from 'helpers/format-file-path';
import React, { useState } from 'react';
import { AiFillFolder, AiFillFolderOpen, AiOutlineFile } from 'react-icons/ai';
import { twJoin, twMerge } from 'tailwind-merge';

interface CustomFileExplorerProps {
	className?: string;
	files: SandpackFiles | null;
}

export const CustomFileExplorer = ({ className, files }: CustomFileExplorerProps) => {
	const { sandpack } = useSandpack();
	const [expandedNodes, setExpandedNodes] = useState<string[]>([]);

	const filePaths = files !== null ? Object.keys(files) : [];
	const filesTree = buildProjectTree(filePaths);

	const style = { icons: 'mr-2' };

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
			if (node.children !== undefined && node.children.length > 0) return toggleNode(node);
			sandpack.openFile(node.path);
		};

		return (
			<div key={node.name}>
				<button
					className={twJoin(
						'flex items-center',
						'w-full px-3 py-1',
						'hover:bg-dark-600 hover:text-primary-200 hover:outline hover:outline-primary'
					)}
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
							className='w-full pl-4 hover:bg-dark-600 hover:outline hover:outline-primary'
							key={child.name}
							onClick={(event) => handleFileClick(node, event)}
						>
							{renderNode(child)}
						</button>
					))}
			</div>
		);
	};

	return (
		<div className={twMerge('bg-dark-900 py-2 text-dark-300', className)}>
			{filesTree.children && filesTree.children.map(renderNode)}
		</div>
	);
};
