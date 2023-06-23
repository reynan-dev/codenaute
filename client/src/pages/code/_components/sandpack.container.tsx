import { SandpackFile, SandpackFiles, useSandpack } from '@codesandbox/sandpack-react';
import ProjectContext from 'context/project/project.context';
import { hasSandpackFilesChanged } from 'helpers/has-sandpack-files-changed';
import { getUnnecessaryFiles } from 'pages/code/_helpers/get-unnecessary-files';
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

	// console.log('PROUUUUUUUUUUUUUUUUUUUUUUUT');

	// console.log(sandpack.files);

	console.log({ previous: previousFilesRef.current, current: sandpack.files });

	// useEffect(() => {
	// 	if (previousFilesRef.current !== null) {
	// 		// previousFilesRef.current = sandpack.files;
	// 	}
	// }, [sandpack]);

	// console.log({ previous: previousFilesRef.current, current: sandpack.files });
	// sandpack.deleteFile('/index.js');

	useEffect(() => {
		const deleteAndCloseFiles = (file: string) => {
			console.log({ file });
			sandpack.deleteFile(file);
			sandpack.closeFile(file);
			console.log({ SANDPACK: sandpack.files });
		};
		// if (sandpack.files === null) return;

		console.log({ previous: previousFilesRef.current, current: sandpack.files });
		if (
			previousFilesRef.current !== null &&
			hasSandpackFilesChanged(previousFilesRef.current, sandpack.files)
		) {
			const unecessaryFiles = getUnnecessaryFiles(sandpack.files, previousFilesRef.current);
			console.log({ unecessaryFiles });

			// sandpack.deleteFile('/index.js');
			unecessaryFiles.map((file) => deleteAndCloseFiles(file));
			// unecessaryFiles.map((file) => sandpack.closeFile(file));
			console.log(hasSandpackFilesChanged(previousFilesRef.current, sandpack.files));
			// sandpack.resetAllFiles();
			// console.log('prout');

			console.log({ work: getUnnecessaryFiles(sandpack.files, previousFilesRef.current) });

			console.log({ sandpackFiles: sandpack.files, previous: previousFilesRef.current });
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
