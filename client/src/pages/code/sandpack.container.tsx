import { SandpackFile, useSandpack } from '@codesandbox/sandpack-react';
import { useEffect } from 'react';

interface SandpackContainerProps {
	className?: string;
	children: JSX.Element;
	setCurrentFiles: React.Dispatch<
		React.SetStateAction<Record<string, string | SandpackFile> | null>
	>;
}

export const SandpackContainer = ({
	className,
	children,
	setCurrentFiles
}: SandpackContainerProps) => {
	const { sandpack } = useSandpack();

	useEffect(() => {
		setCurrentFiles(sandpack.files);
	}, [sandpack.files, setCurrentFiles]);

	return <>{children}</>;
};
