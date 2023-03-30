import React from 'react';
import { twMerge } from 'tailwind-merge';

interface MainProps {
	children: React.ReactNode;
	className?: string;
}

export const Main = ({ children, className }: MainProps) => {

	const marginLeftForNavBar = 'mt-16 ml-0 md:ml-14 md:mt-0'

	return <main className={twMerge(marginLeftForNavBar, 'flex flex-col h-full w-full', className)}>{children}</main>;
};
