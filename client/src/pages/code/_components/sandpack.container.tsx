import { useSandpack } from '@codesandbox/sandpack-react';
import ProjectContext from 'context/project/project.context';
import { useContext, useEffect } from 'react';

interface SandpackContainerProps {
	children: JSX.Element;
}

export const SandpackContainer = ({ children }: SandpackContainerProps) => {
	const { sandpack } = useSandpack();
	const { setFiles } = useContext(ProjectContext);

	useEffect(() => {
		setFiles(sandpack.files);
	}, [sandpack.files, setFiles]);

	return <>{children}</>;
};
