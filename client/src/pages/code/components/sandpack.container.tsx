import { useSandpack } from '@codesandbox/sandpack-react';
import ProjectContext from 'context/project.context';
import { ProjectState } from 'pages/code/code.container';
import { useContext, useEffect } from 'react';

interface SandpackContainerProps {
	children: JSX.Element;
	state: ProjectState;
}

export const SandpackContainer = ({ state, children }: SandpackContainerProps) => {
	const { sandpack } = useSandpack();
	const { setCurrentProjectData } = useContext(ProjectContext);

	useEffect(() => {
		setCurrentProjectData({
			name: state.projectName,
			files: sandpack.files
		});
	}, [sandpack.files, setCurrentProjectData, state.projectName]);

	return <>{children}</>;
};
