import {
	SandpackCodeEditor,
	SandpackConsole,
	SandpackFile,
	SandpackLayout,
	SandpackPreview,
	SandpackProvider
} from '@codesandbox/sandpack-react';
import { Dependencies, SandpackTemplate } from 'pages/code/code.container';
import { FileExplorerPanel } from 'pages/code/components/file-explorer-panel';
import { sandpackCustomTheme } from 'styles/sandpack-theme';

interface CodePageProps {
	dependencies: Dependencies;
	devDependencies: Dependencies;
	mappedFilesForSandpack: Record<string, string | SandpackFile>;
	template: SandpackTemplate | undefined;
}

export const CodePage = ({ template }: CodePageProps) => {
	return (
		<SandpackProvider theme={sandpackCustomTheme} style={{ height: '100%' }} template={template}>
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
		</SandpackProvider>
	);
};
