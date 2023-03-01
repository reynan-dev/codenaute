import React from 'react';
import { twMerge } from 'tailwind-merge';

interface ContainerProps {
	children: React.ReactNode;
	className?: string;
}

export const Container = ({ children, className }: ContainerProps) => {
	return <div className={twMerge(className, 'h-full w-full py-8 px-4', 'lg:p-12')}>{children}</div>;
};
