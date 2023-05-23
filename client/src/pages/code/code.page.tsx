import {
	SandpackCodeEditor,
	SandpackCodeEditor,
	SandpackConsole,
	SandpackFile,
	SandpackLayout,
	SandpackPreview,
	SandpackProvider
} from '@codesandbox/sandpack-react';
import { Project } from 'fixtures/projects-fixtures';
import { Dependencies, SandpackTemplate } from 'pages/code/code.container';
import { FileExplorerPanel } from 'pages/code/components/file-explorer-panel';
import { SandpackContainer } from 'pages/code/sandpack.container';
import { useState } from 'react';
import { SandpackContainer } from 'pages/code/sandpack.container';
import { useState } from 'react';
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
	setProjectData: React.Dispatch<React.SetStateAction<Project | null>>;
	template: SandpackTemplate | undefined;
}

export const CodePage = ({
	dependencies,
	devDependencies,
	mappedFilesForSandpack,
	mappedFilesForMonacoEditor,
	setProjectData,
	template
}: CodePageProps) => {
	const [currentFiles, setCurrentFiles] = useState<Record<string, string | SandpackFile> | null>(
		null
	);

	return (
		<SandpackProvider
			theme={sandpackCustomTheme}
			style={{ height: '100%' }}
			// files={mappedFilesForSandpack}
			template={template}
			// customSetup={{ dependencies: dependencies, devDependencies: devDependencies }}
		>
			<SandpackContainer setCurrentFiles={setCurrentFiles}>
				<SandpackLayout
					style={{
						width: '100%',
						height: '100%',
						borderRadius: '0',
						border: 'none'
					}}
				>
					<div className='flex h-full w-full'>
						<FileExplorerPanel
							setProjectData={setProjectData}
							className='h-100 flex w-2/12 min-w-56 flex-col'
						/>

						<div className='h-full flex-1 bg-dark-900'>
							<SandpackCodeEditor
								style={{
									width: '100%',
									height: '100%',
									borderRadius: '0',
									border: 'none'
								}}
							/>
						</div>

						<div className='flex h-full flex-1 flex-col'>
							<div className='h-1/2'>
								<SandpackPreview
									className=''
									showNavigator
									showOpenInCodeSandbox={false}
									style={{
										height: '100%'
									}}
								/>
							</div>
							<div className='h-1/2'>
								<SandpackConsole
									style={{
										height: '100%'
									}}
								/>
							</div>
						</div>
					</div>
				</SandpackLayout>
			</SandpackContainer>
		</SandpackProvider>
	);
};
