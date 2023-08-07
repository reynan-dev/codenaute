import { TreeNode } from 'helpers/format-file-path';
import React from 'react';

interface ContextMenuProps {
	position: { x: number; y: number };
	onClose: () => void;
	onAction: (action: string, node: TreeNode, event: React.MouseEvent) => void;
	node: TreeNode;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ position, onClose, onAction, node }) => {
	const { x, y } = position;

	const handleAction = (action: string, node: TreeNode, event: React.MouseEvent) => {
		onAction(action, node, event);
		onClose();
	};

	return (
		<div
			className='fixed z-50 w-36 rounded-sm bg-dark-800 text-white shadow-md'
			style={{ left: x, top: y }}
		>
			<ul className='py-2'>
				<li>
					<button
						className='flex w-full items-start px-3 py-1 hover:bg-dark-700'
						onClick={(event) => handleAction('open', node, event)}
					>
						Open
					</button>
				</li>
				<li>
					<button
						className='flex w-full items-start px-3 py-1 hover:bg-dark-700'
						onClick={(event) => handleAction('rename', node, event)}
					>
						Rename
					</button>
				</li>
				<li>
					<button
						className='flex w-full items-start px-3 py-1 hover:bg-dark-700'
						onClick={(event) => handleAction('set-main', node, event)}
					>
						Set as main file
					</button>
				</li>
				<li>
					<button
						className='flex w-full items-start px-3 py-1 hover:bg-dark-700'
						onClick={(event) => handleAction('delete', node, event)}
					>
						Delete
					</button>
				</li>
			</ul>
		</div>
	);
};
