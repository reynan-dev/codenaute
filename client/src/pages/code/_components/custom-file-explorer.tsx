import { SandpackFiles, useSandpack } from '@codesandbox/sandpack-react';
import ProjectContext from 'context/project/project.context';
import { TreeNode, buildProjectTree } from 'helpers/format-file-path';
import { ContextMenu } from 'pages/code/_components/context-menu';
import { renameFile } from 'pages/code/_helpers/rename-file';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { AiFillFolder, AiFillFolderOpen, AiOutlineFile } from 'react-icons/ai';
import { twJoin, twMerge } from 'tailwind-merge';

interface CustomFileExplorerProps {
	className?: string;
	files: SandpackFiles | null;
}

type Position = { x: number; y: number };

export const CustomFileExplorer = ({ className, files }: CustomFileExplorerProps) => {
	const { sandpack } = useSandpack();
	const [filesTree, setFilesTree] = useState<TreeNode | null>(null);
	const [expandedNodes, setExpandedNodes] = useState<string[]>([]);
	const [contextMenuPosition, setContextMenuPosition] = useState<null | Position>(null);
	const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);
	const [renamingNode, setRenamingNode] = useState<TreeNode | null>(null);
	const [newFileName, setNewFileName] = useState<string | null>(null);
	const { setActiveFile, setVisibleFiles, visibleFiles } = useContext(ProjectContext);
	const filesElementRef = useRef<HTMLDivElement | null>(null);

	const style = {
		icons: 'mr-2'
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

		document.addEventListener('click', function (event) {
			if (
				filesElementRef.current !== null &&
				filesElementRef.current.contains(event.target as Node)
			) {
				handleDocumentClick();
			}
		});

		return () => {
			document.removeEventListener('click', handleDocumentClick);
		};
	}, [filesElementRef]);

	useEffect(() => {
		if (files !== null) setFilesTree(buildProjectTree(files));
	}, [files]);

	useEffect(() => {
		console.log({ selectedNode });
	}, [selectedNode]);

	const handleRenameStart = (selectedNode: TreeNode, event: React.MouseEvent) => {
		event.stopPropagation();
		setRenamingNode(selectedNode);
	};

	const handleRenameCancel = () => {
		setRenamingNode(null);
	};

	const handleRenameSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		if (newFileName !== null && selectedNode !== null) {
			renameFile(newFileName, selectedNode, sandpack);
			setRenamingNode(null);
		}
	};

	const onAction = (action: string, node: TreeNode, event: React.MouseEvent) => {
		if (action === 'rename' && selectedNode !== null) {
			handleRenameStart(selectedNode, event);
		}
		if (action === 'delete' && selectedNode !== null) {
			sandpack.deleteFile(selectedNode.path);
		}
	};

	const renderNode = (node: TreeNode, parent?: TreeNode) => {
		const isExpanded = expandedNodes.includes(node.path);
		const isChildNode = parent ? isChild(node, parent) : false;

		const toggleNode = (node: TreeNode) => {
			if (isExpanded) {
				setExpandedNodes(expandedNodes.filter((path) => path !== node.path));
			} else {
				setExpandedNodes((prevExpandedNodes) => [...prevExpandedNodes, node.path]);
			}
		};

		const handleFileClick = (node: TreeNode, event: React.MouseEvent) => {
			event.stopPropagation();
			setSelectedNode(node);
			if (node.children !== undefined && node.children.length > 0) return toggleNode(node);
			sandpack.openFile(node.path);
			setActiveFile(node.path);
			if (!visibleFiles.includes(node.path))
				setVisibleFiles((previousState) => [...previousState, node.path]);
		};

		const handleContextMenu = (event: React.MouseEvent, node: TreeNode) => {
			event.preventDefault();
			setSelectedNode(node);
			setContextMenuPosition({ x: event.clientX, y: event.clientY });
		};

		const handleOnFocus = (event: React.FocusEvent<HTMLInputElement, Element>) => {
			event.currentTarget.select();
			setNewFileName(node.name);
		};

		return (
			<div key={node.name}>
				{renamingNode?.path === node.path ? (
					<form onSubmit={handleRenameSubmit}>
						<div
							className={twMerge(
								'flex items-center',
								'w-full',
								'hover:bg-dark-700 hover:text-primary-200',
								isChildNode ? 'pl-4' : ''
							)}
						>
							<div className='ml-3'>
								{node.children && node.children.length > 0 ? (
									isExpanded ? (
										<AiFillFolderOpen className={style.icons} />
									) : (
										<AiFillFolder className={style.icons} />
									)
								) : (
									<AiOutlineFile className={style.icons} />
								)}
							</div>
							<input
								type='text'
								id='node-input'
								value={newFileName ?? ''}
								onChange={(event) => setNewFileName(event.target.value)}
								onFocus={(event) => handleOnFocus(event)}
								onBlur={handleRenameCancel}
								autoFocus
								className={twJoin(
									'flex items-center',
									'w-full px-3 py-1',
									node.path === selectedNode?.path
										? 'outline outline-1 -outline-offset-1 outline-primary'
										: '',
									sandpack.activeFile === node.path ? 'bg-dark-700' : ''
								)}
							/>
						</div>
					</form>
				) : (
					<button
						className={twMerge(
							'flex items-center',
							'w-full px-3 py-1',
							'hover:bg-dark-700 hover:text-primary-200',
							node.path === selectedNode?.path
								? 'outline outline-1 -outline-offset-1 outline-primary'
								: '',
							sandpack.activeFile === node.path ? 'bg-dark-700' : ''
						)}
						onClick={(event) => handleFileClick(node, event)}
						onMouseDown={(event) => {
							if (event.button === 2) handleContextMenu(event, node);
						}}
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
							<span>{node.name}</span>
						</div>
					</button>
				)}

				{isExpanded &&
					node.children &&
					node.children.map((child, index) => (
						<div key={index} onClick={(event) => handleFileClick(child, event)}>
							{renderNode(child, node)}
						</div>
					))}

				{contextMenuPosition && (
					<ContextMenu
						position={contextMenuPosition}
						onClose={() => setContextMenuPosition(null)}
						onAction={onAction}
						node={node}
					/>
				)}
			</div>
		);
	};

	return (
		<div ref={filesElementRef} className={twMerge('bg-dark-900 py-2 text-dark-300', className)}>
			{Array.isArray(filesTree?.children) && filesTree?.children.map((node) => renderNode(node))}
		</div>
	);
};

export default CustomFileExplorer;
