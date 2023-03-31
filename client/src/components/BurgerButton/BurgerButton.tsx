import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface BurgerButtonProps {
	onClick: () => void;
}

export const BurgerButton = ({ onClick }: BurgerButtonProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const genericHamburgerLine = 'h-[3px] w-8 my-1 rounded-full bg-primary transition ease transform duration-300';

	const handleOnClick = () => {
		setIsOpen(!isOpen);
		onClick();
	};

	return (
		<button
			className='group flex h-10 w-fit flex-col items-center justify-center'
			onClick={() => handleOnClick()}
		>
			<div
				className={twMerge(
					genericHamburgerLine,
					isOpen ? 'translate-y-[11px] rotate-45 opacity-100' : 'opacity-100'
				)}
			/>
			<div className={twMerge(genericHamburgerLine, isOpen ? 'opacity-0' : 'opacity-100')} />
			<div
				className={twMerge(
					genericHamburgerLine,
					isOpen ? '-translate-y-[11px] -rotate-45 opacity-100' : 'opacity-100'
				)}
			/>
		</button>
	);
};
