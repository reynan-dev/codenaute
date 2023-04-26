import { twMerge } from 'tailwind-merge';

interface BurgerButtonProps {
	onClick: () => void;
	isOpen: boolean;
}

export const BurgerButton = ({ onClick, isOpen }: BurgerButtonProps) => {
	const genericHamburgerLine =
		'h-[3px] w-8 my-1 rounded-full bg-primary transition ease transform duration-300';

	return (
		<button
			className='group flex h-10 w-fit flex-col items-center justify-center'
			onClick={onClick}
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
