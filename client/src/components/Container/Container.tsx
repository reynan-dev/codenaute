import React from 'react';
import { clsxMerge } from '../../helpers/clsxMerge';

interface ContainerProps {
	children: React.ReactNode;
	className?: string;
}

export default function Container({ children, className }: ContainerProps) {
	return <div className={clsxMerge(className, 'h-full w-full p-4', 'lg:p-12')}>{children}</div>;
}
