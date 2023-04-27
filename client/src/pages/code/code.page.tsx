import {
	SandpackConsole,
	SandpackFile,
	SandpackLayout,
	SandpackPreview,
	SandpackProvider
} from '@codesandbox/sandpack-react';
import { Dependencies } from 'pages/code/code.container';
import { FileExplorerPanel } from 'pages/code/components/file-explorer-panel';
import { MonacoEditor } from 'pages/code/components/monaco-editor';
import { sandpackCustomTheme } from 'styles/sandpack-theme';

interface CodePageProps {
	dependencies: Dependencies;
	devDependencies: Dependencies;
	mappedFilesForSandpack: Record<string, string | SandpackFile>;
	mappedFilesForMonacoEditor: Record<
		string,
		{
			code: string | SandpackFile;
			programmingLanguage: string;
		}
	>;
}

export const CodePage = ({
	dependencies,
	devDependencies,
	mappedFilesForSandpack,
	mappedFilesForMonacoEditor
}: CodePageProps) => {
	return (
		<SandpackProvider
			theme={sandpackCustomTheme}
			style={{ height: '100%' }}
			// template='react-ts'
			files={mappedFilesForSandpack}
			customSetup={{ dependencies: dependencies, devDependencies: devDependencies }}
		>
			<SandpackLayout
				style={{
					width: '100%',
					height: '100%',
					borderRadius: '0',
					border: 'none'
				}}
			>
				<div className='flex h-full w-full'>
					<FileExplorerPanel className='h-100 flex w-2/12 min-w-56 flex-col' />

					<MonacoEditor files={mappedFilesForMonacoEditor} className='h-full flex-1 bg-dark-900' />

					<div className='flex h-full flex-1 flex-col'>
						<SandpackPreview
							className=''
							showNavigator
							showOpenInCodeSandbox={false}
							style={{
								height: '100%'
							}}
						/>
						<SandpackConsole
							style={{
								height: '100%'
							}}
						/>
					</div>
				</div>
			</SandpackLayout>
		</SandpackProvider>
	);
};
