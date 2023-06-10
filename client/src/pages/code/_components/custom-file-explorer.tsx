import { SandpackFiles, useSandpack } from '@codesandbox/sandpack-react';
import { buildProjectTree } from 'helpers/format-file-path';
// import { formatFilePath } from 'helpers/format-file-path';

interface CustomFileExplorerProps {
	className?: string;
	files: SandpackFiles | null;
}

export const CustomFileExplorer = ({ className, files }: CustomFileExplorerProps) => {
	const { sandpack } = useSandpack();

	const filePaths = files !== null ? Object.keys(files) : [];

	console.log(buildProjectTree(filePaths));

	// console.log({ filePaths })

	return <div className={className}>prout</div>;
};
