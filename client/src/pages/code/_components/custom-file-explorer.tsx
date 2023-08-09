import { SandpackFiles, useSandpack } from '@codesandbox/sandpack-react';
import ProjectContext from 'context/project/project.context';
import { TreeNode, buildProjectTree } from 'helpers/format-file-path';
import { ContextMenu } from 'pages/code/_components/context-menu';
import { isChildNode } from 'pages/code/_helpers/is-child-node';
import { isDirectory } from 'pages/code/_helpers/is-directory';
import { renameFile } from 'pages/code/_helpers/rename-file';
import { renameFolder } from 'pages/code/_helpers/rename-folder';
import { Position, useContextMenuEvents } from 'pages/code/_hooks/use-context-menu-events';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { AiFillFolder, AiFillFolderOpen, AiOutlineFile } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { twJoin, twMerge } from 'tailwind-merge';

interface CustomFileExplorerProps {
	className?: string;
	files: SandpackFiles | null;
}

export const CustomFileExplorer = ({ className, files }: CustomFileExplorerProps) => {
	const [filesTree, setFilesTree] = useState<TreeNode | null>(null);
	const [expandedNodes, setExpandedNodes] = useState<string[]>([]);
	const [contextMenuPosition, setContextMenuPosition] = useState<null | Position>(null);
	const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);
	const [renamingNode, setRenamingNode] = useState<TreeNode | null>(null);
	const [newFileName, setNewFileName] = useState<string | null>(null);
	const [newFolderName, setNewFolderName] = useState<string | null>(null);
	const { sandpack } = useSandpack();
	const filesElementRef = useRef<HTMLDivElement | null>(null);
	const {
		setActiveFile,
		setVisibleFiles,
		visibleFiles,
		setCurrentProjectData,
		currentProjectData
	} = useContext(ProjectContext);

	useContextMenuEvents(filesElementRef, setContextMenuPosition);

	useEffect(() => {
		if (files !== null) setFilesTree(buildProjectTree(files));
	}, [files]);

	const renderNode = (node: TreeNode, parent?: TreeNode) => {
		const isExpanded = expandedNodes.includes(node.path);

		const handleRenameStart = (selectedNode: TreeNode, event: React.MouseEvent) => {
			event.stopPropagation();
			setRenamingNode(selectedNode);
		};

		const handleRenameCancel = () => {
			setRenamingNode(null);
		};

		const handleRenameSubmit = (event: React.FormEvent) => {
			event.preventDefault();

			if (newFileName !== null && selectedNode !== null && files !== null) {
				isDirectory(selectedNode)
					? renameFolder(selectedNode, setFilesTree, files, setCurrentProjectData, newFolderName)
					: renameFile(newFileName, selectedNode, sandpack);
				setRenamingNode(null);
			}
		};

		const onContextMenuAction = (action: string, node: TreeNode, event: React.MouseEvent) => {
			if (action === 'open' && selectedNode !== null) {
				sandpack.openFile(selectedNode.path);
			}
			if (action === 'rename' && selectedNode !== null) {
				handleRenameStart(selectedNode, event);
			}
			if (action === 'set-main' && selectedNode !== null) {
				if (selectedNode.path !== currentProjectData?.main && currentProjectData !== null) {
					currentProjectData.main = selectedNode.path;
					sandpack.setActiveFile(currentProjectData.main);

					toast.success('Main file successfully set.');
				}
			}
			if (action === 'delete' && selectedNode !== null) {
				if (selectedNode.path === currentProjectData?.mainFile) {
					const arrayOfMainFile = Object.keys(currentProjectData?.files).filter(
						(file) => file !== selectedNode.path
					);
					currentProjectData.mainFile = arrayOfMainFile[0];
				}
				sandpack.deleteFile(selectedNode.path);

				toast.success('File successfully deleted.');
			}
		};

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

		const style = {
			icons: 'mr-2'
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
								isChildNode(node, parent) ? 'pl-4' : ''
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
								value={(isDirectory(node) ? newFolderName : newFileName) ?? ''}
								onChange={(event) => {
									isDirectory(node)
										? setNewFolderName(event.target.value)
										: setNewFileName(event.target.value);
								}}
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
						<div className={twJoin('flex items-center', isChildNode(node, parent) ? 'pl-4' : '')}>
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
						onAction={onContextMenuAction}
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
