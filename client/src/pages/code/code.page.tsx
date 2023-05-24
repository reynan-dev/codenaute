import {
	SandpackCodeEditor,
	SandpackConsole,
	SandpackLayout,
	SandpackPreview,
	SandpackProvider
} from '@codesandbox/sandpack-react';
import { ProjectState } from 'pages/code/code.container';
import { SandpackTemplate } from 'pages/code/code.service';
import { FileExplorerPanel } from 'pages/code/components/file-explorer-panel';
import { ProjectPanel } from 'pages/code/components/project-panel';
import { SandpackContainer } from 'pages/code/components/sandpack.container';
import { sandpackCustomTheme } from 'styles/sandpack-theme';

interface CodePageProps {
	// dependencies: Dependencies;
	// devDependencies: Dependencies;
	template: SandpackTemplate | undefined;
	state: ProjectState;
}

export const CodePage = ({ template, state }: CodePageProps) => {
	return (
		<SandpackProvider theme={sandpackCustomTheme} style={{ height: '100%' }} template={template}>
			<SandpackContainer state={state}>
				<SandpackLayout
					style={{
						width: '100%',
						height: '100%',
						borderRadius: '0',
						border: 'none'
					}}
				>
					<ProjectPanel className='w-full flex-1' template={template} state={state} />
					<div className='flex h-full w-full'>
						<div className='h-100 flex w-2/12 min-w-56 flex-col'>
							<FileExplorerPanel className='h-100 w-100 flex flex-1 flex-col' />
						</div>

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
