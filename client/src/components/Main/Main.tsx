import React from 'react';
import { twMerge } from 'tailwind-merge';

interface MainProps {
	children: React.ReactNode;
	className?: string;
}

export const Main = ({ children, className }: MainProps) => {
	return <main className={twMerge('flex flex-col h-full w-full', className)}>{children}</main>;
};
