import React from 'react';

interface ContextMenuProps {
	position: { x: number; y: number };
	onClose: () => void;
	onAction: (action: string) => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ position, onClose, onAction }) => {
	const { x, y } = position;

	const handleAction = (action: string) => {
		onAction(action);
		onClose();
	};

	return (
		<div className='fixed z-50 bg-white shadow-md' style={{ left: x, top: y }}>
			<ul>
				<li onClick={() => handleAction('open')}>Open</li>
				<li onClick={() => handleAction('rename')}>Rename</li>
				<li onClick={() => handleAction('delete')}>Delete</li>
			</ul>
		</div>
	);
};
