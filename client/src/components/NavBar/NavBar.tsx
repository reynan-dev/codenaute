import React from 'react';
import { twMerge } from 'tailwind-merge';

interface NavBarProps {
	className?: string;
}

export const NavBar = ({ className }: NavBarProps) => {
	return <div className={twMerge('w-full h-16 md:w-14 md:h-full bg-dark', className)}>NavBar</div>;
};
