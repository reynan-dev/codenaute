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
		<div
			className='fixed z-50 w-36 rounded-sm bg-dark-800 text-white shadow-lg shadow-black'
			style={{ left: x, top: y }}
		>
			<ul className='py-2'>
				<li className='px-3 py-1 hover:bg-dark-600' onClick={() => handleAction('open')}>
					Open
				</li>
				<li className='px-3 py-1 hover:bg-dark-600' onClick={() => handleAction('rename')}>
					Rename
				</li>
				<li className='px-3 py-1 hover:bg-dark-600' onClick={() => handleAction('delete')}>
					Delete
				</li>
			</ul>
		</div>
	);
};
