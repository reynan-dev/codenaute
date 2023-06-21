import { SandpackFiles, useSandpack } from '@codesandbox/sandpack-react';
import { TreeNode, buildProjectTree } from 'helpers/format-file-path';
import { ContextMenu } from 'pages/code/_components/context-menu';
import React, { useEffect, useState } from 'react';
import { AiFillFolder, AiFillFolderOpen, AiOutlineFile } from 'react-icons/ai';
import { twJoin, twMerge } from 'tailwind-merge';

interface CustomFileExplorerProps {
	className?: string;
	files: SandpackFiles | null;
}

export const CustomFileExplorer = ({ className, files }: CustomFileExplorerProps) => {
	const { sandpack } = useSandpack();
	const [expandedNodes, setExpandedNodes] = useState<string[]>([]);
	const [contextMenuPosition, setContextMenuPosition] = useState<null | { x: number; y: number }>(
		null
	);

	const filePaths = files !== null ? Object.keys(files) : [];
	const filesTree = buildProjectTree(filePaths);

	const style = {
		icons: 'mr-2'
		// explorerElement: 'hover:outline hover:outline-1 hover:-outline-offset-1 hover:outline-primary'
	};

	const isChild = (child: TreeNode, parent: TreeNode): boolean => {
		if (!parent.children) {
			return false;
		}

		return parent.children.some((node) => node === child || isChild(child, node));
	};

	const closeContextMenu = () => {
		setContextMenuPosition(null);
	};

	useEffect(() => {
		const handleDocumentClick = () => {
			closeContextMenu();
		};

		document.addEventListener('click', handleDocumentClick);

		return () => {
			document.removeEventListener('click', handleDocumentClick);
		};
	}, []);

	const renderNode = (node: TreeNode, parent?: TreeNode) => {
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

		const isChildNode = parent ? isChild(node, parent) : false;

		const handleContextMenu = (event: React.MouseEvent, node: TreeNode) => {
			event.preventDefault();
			setContextMenuPosition({ x: event.clientX, y: event.clientY });
			// Faire d'autres traitements nécessaires pour le menu contextuel en fonction du nœud
		};

		return (
			<div key={node.name}>
				<button
					className={twMerge(
						'flex items-center',
						'w-full px-3 py-1',
						'hover:bg-dark-600 hover:text-primary-200',
						sandpack.activeFile === node.path
							? 'bg-dark-600 text-primary-200 outline outline-1 -outline-offset-1 outline-primary'
							: ''
					)}
					onClick={(event) => handleFileClick(node, event)}
					onContextMenu={(event) => handleContextMenu(event, node)}
				>
					<div className={twJoin('flex items-center', isChildNode ? 'pl-4' : '')}>
						{node.children && node.children.length > 0 ? (
							isExpanded ? (
								<AiFillFolderOpen className={style.icons} />
							) : (
								<AiFillFolder className={style.icons} />
							)
						) : (
							<AiOutlineFile className={style.icons} />
						)}
						<span className=''>{node.name}</span>
					</div>
				</button>

				{isExpanded &&
					node.children &&
					node.children.map((child) => (
						<div key={child.name} onClick={(event) => handleFileClick(child, event)}>
							{renderNode(child, node)}
						</div>
					))}
			</div>
		);
	};

	return (
		<div className={twMerge('bg-dark-900 py-2 text-dark-300', className)}>
			{Array.isArray(filesTree.children) && filesTree.children.map((node) => renderNode(node))}
			{/* Afficher le menu contextuel si la position est définie */}
			{contextMenuPosition && (
				<ContextMenu
					position={contextMenuPosition}
					onClose={() => setContextMenuPosition(null)}
					onAction={() => console.log('prout')}
				/>
			)}
		</div>
	);
};

export default CustomFileExplorer;
