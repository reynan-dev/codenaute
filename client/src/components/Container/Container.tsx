import { clsxMerge } from 'helpers/clsxMerge';
import React from 'react';

interface ContainerProps {
	children: React.ReactNode;
	className?: string;
}

export default function Container({ children, className }: ContainerProps) {
	return (
		<div className={clsxMerge(className, 'h-full w-full py-8 px-4', 'lg:p-12')}>{children}</div>
	);
}
