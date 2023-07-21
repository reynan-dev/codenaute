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
	const {
		setCurrentProjectData,
		currentProjectData,
		setActiveFile,
		setVisibleFiles,
		visibleFiles
	} = useContext(ProjectContext);

	const previousFilesRef = useRef<SandpackFiles | null>(
		currentProjectData !== null ? currentProjectData.files : null
	);

	useEffect(() => {
		setActiveFile(sandpack.activeFile);
	}, [sandpack.activeFile, setActiveFile]);

	useEffect(() => {
		if (sandpack.visibleFiles.length !== visibleFiles.length) {
			setVisibleFiles(sandpack.visibleFiles);
		}
	}, [sandpack.visibleFiles, setVisibleFiles, visibleFiles.length]);

	useEffect(() => {
		if (
			previousFilesRef.current !== null &&
			hasSandpackFilesChanged(previousFilesRef.current, sandpack.files)
		) {
			previousFilesRef.current = sandpack.files;
			setCurrentProjectData(
				(previousState) =>
					({
						...previousState,
						files: sandpack.files
					} as ProjectContextData)
			);
		}
	}, [sandpack, sandpack.files, setCurrentProjectData]);

	return <>{children}</>;
};
