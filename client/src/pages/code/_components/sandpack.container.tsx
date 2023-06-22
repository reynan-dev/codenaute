import { SandpackFiles, useSandpack } from '@codesandbox/sandpack-react';
import ProjectContext from 'context/project/project.context';
import { hasSandpackFilesChanged } from 'helpers/has-sandpack-files-changed';
import { useContext, useEffect, useRef } from 'react';
import { ProjectContextData } from 'types/project';

interface SandpackContainerProps {
	children: JSX.Element;
}

export const SandpackContainer = ({ children }: SandpackContainerProps) => {
	const { sandpack } = useSandpack();
	const { setCurrentProjectData, currentProjectData } = useContext(ProjectContext);

	const previousFilesRef = useRef<SandpackFiles | null>(
		currentProjectData !== null ? currentProjectData.files : null
	);

	useEffect(() => {
		console.log({ previous: previousFilesRef.current, current: sandpack.files });
		if (previousFilesRef.current !== null) {
			console.log(hasSandpackFilesChanged(previousFilesRef.current, sandpack.files));
		}
		if (
			previousFilesRef.current !== null &&
			hasSandpackFilesChanged(previousFilesRef.current, sandpack.files)
		) {
			previousFilesRef.current = sandpack.files;
			console.log('prout');

			setCurrentProjectData(
				(previousState) =>
					({
						id: previousState?.id,
						name: previousState?.name,
						sandpackTemplate: previousState?.sandpackTemplate,
						files: sandpack.files
					} as ProjectContextData)
			);
		}
	}, [sandpack.files, setCurrentProjectData]);

	return <>{children}</>;
};
