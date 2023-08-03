import React from 'react';
import { twMerge } from 'tailwind-merge';

interface ContainerProps {
	children: React.ReactNode;
	className?: string;
}

export const Container = ({ children, className }: ContainerProps) => {
	return <div className={twMerge('w-full px-4 py-8', 'lg:p-12', className)}>{children}</div>;
};
