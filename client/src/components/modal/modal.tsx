import React, { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { twMerge } from 'tailwind-merge';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
	const handleOnClose = () => {
		setOpacity(0);
		setTimeout(() => {
			onClose();
		}, 100);
	};

	const [opacity, setOpacity] = useState(0);

	useEffect(() => {
		if (isOpen) {
			setOpacity(0.3);
		}
	}, [isOpen]);

	return createPortal(
		<>
			{!isOpen ? null : (
				<div className='fixed inset-0 z-50 overflow-y-auto'>
					<div className='flex min-h-screen items-center justify-center'>
						<div className='fixed inset-0' onClick={handleOnClose}>
							<div
								style={{
									opacity: opacity,
									transition: 'opacity linear 100ms'
								}}
								className='absolute inset-0 bg-dark-500 transition-all duration-300 ease-in-out'
							/>
						</div>
						<div className='z-50 rounded-lg bg-white p-6'>{children}</div>
					</div>
				</div>
			)}
		</>,
		document.body
	);
};
