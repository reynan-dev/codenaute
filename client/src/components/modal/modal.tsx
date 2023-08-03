import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { twMerge } from 'tailwind-merge';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
	fullScreen?: boolean;
	className?: string;
}

export const Modal = ({ isOpen, onClose, children, fullScreen = false, className }: ModalProps) => {
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
						<div
							className={twMerge(
								'z-50 w-80 rounded-lg bg-dark-900 p-6 shadow-lg',
								fullScreen ? 'w-full m-10' : '',
								className
							)}
						>
							{children}
						</div>
					</div>
				</div>
			)}
		</>,
		document.body
	);
};
