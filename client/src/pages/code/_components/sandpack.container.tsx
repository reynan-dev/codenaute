import { SandpackFiles, useSandpack } from '@codesandbox/sandpack-react';
import ProjectContext from 'context/project/project.context';
import { getAddedFilePath } from 'helpers/get-added-file-path';
import { hasMainFileChanged, hasSandpackFilesChanged } from 'helpers/has-sandpack-files-changed';
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

	const previousMainFileRef = useRef<string | null>(
		currentProjectData !== null ? currentProjectData.mainFile : null
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
		const newFilePath = getAddedFilePath(previousFilesRef.current, sandpack.files);

		if (
			previousMainFileRef.current !== null &&
			hasMainFileChanged(previousMainFileRef.current, sandpack.activeFile)
		) {
			previousFilesRef.current = sandpack.files;
			previousMainFileRef.current = sandpack.activeFile;

			return setCurrentProjectData(
				(previousState) =>
					({
						...previousState,
						mainFile: sandpack.activeFile,
						files: sandpack.files
					} as ProjectContextData)
			);
		}

		if (
			previousFilesRef.current !== null &&
			hasSandpackFilesChanged(previousFilesRef.current, sandpack.files)
		) {
			previousFilesRef.current = sandpack.files;
			if (
				currentProjectData?.files !== undefined &&
				Object.keys(sandpack.files).includes(currentProjectData?.mainFile)
			) {
				return setCurrentProjectData(
					(previousState) =>
						({
							...previousState,
							files: sandpack.files
						} as ProjectContextData)
				);
			}

			setCurrentProjectData(
				(previousState) =>
					({
						...previousState,
						mainFile: newFilePath,
						files: sandpack.files
					} as ProjectContextData)
			);
		}
	}, [
		currentProjectData?.files,
		currentProjectData?.mainFile,
		sandpack,
		sandpack.files,
		setCurrentProjectData
	]);

	return <>{children}</>;
};
