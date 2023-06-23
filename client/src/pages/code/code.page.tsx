import {
	SandpackCodeEditor,
	SandpackConsole,
	SandpackFiles,
	SandpackLayout,
	SandpackPreview,
	SandpackProvider
} from '@codesandbox/sandpack-react';
import { ErrorLoading } from 'components/error/error-loading';
import { checkSandboxEnvironment } from 'helpers/check-sandbox-environment';
import { buildProjectTree } from 'helpers/format-file-path';
import { getCheckedTemplateParam } from 'helpers/get-cheked-template-param';
import { FileExplorerPanel } from 'pages/code/_components/file-explorer-panel';
import { ProjectPanel } from 'pages/code/_components/project-panel';
import { SandpackContainer } from 'pages/code/_components/sandpack.container';
import { ProjectState } from 'pages/code/code.container';
import { FaExclamationCircle } from 'react-icons/fa';
import { sandpackCustomTheme } from 'styles/sandpack-theme';
import { twJoin } from 'tailwind-merge';

interface CodePageProps {
	state: ProjectState;
}

export const CodePage = ({ state }: CodePageProps) => {
	const checkedEnvironment = checkSandboxEnvironment(state.currentProjectData?.environment);
	const template = getCheckedTemplateParam(state.currentProjectData?.sandpackTemplate ?? '');

	function getCodeFromSandpackFiles(files: SandpackFiles, filePath: string): string | undefined {
		const file = files[filePath];
		if (file && typeof file === 'object' && 'code' in file) {
			return file.code;
		}
		return undefined;
	}

	const filePaths =
		state.files !== null
			? Object.entries(state.files).map(([path, file]) => {
					if (typeof file === 'string') {
						return { path, code: file };
					} else {
						return { path, code: file.code };
					}
			  })
			: [];

	console.log({ filePaths });

	const packageJsonCode = filePaths.filter((file) => file.path === '/package.json');
	console.log({ packageJsonCode });

	// const dependencies = JSON.parse(packageJsonCode ?? '').dependencies;
	// const devDependencies = JSON.parse(packageJsonCode ?? '').devDependencies;

	// console.log({ dependencies, devDependencies });

	return (
		<>
			{state.currentProjectData?.files !== undefined && template !== undefined ? (
				<SandpackProvider
					theme={sandpackCustomTheme}
					customSetup={{
						dependencies: {
							react: '^18.0.0',
							'react-dom': '^18.0.0',
							'react-scripts': '^4.0.0'
						},
						devDependencies: {
							'@types/react': '^18.0.0',
							'@types/react-dom': '^18.0.0',
							typescript: '^4.0.0'
						},
						environment: checkedEnvironment
					}}
					style={{ height: '100%' }}
					files={state.currentProjectData?.files}
					// template={template}
					options={{
						// visibleFiles: ['App.tsx'],
						activeFile: state.activeFile
					}}
				>
					<SandpackContainer>
						<SandpackLayout
							style={{
								width: '100%',
								height: '100%',
								borderRadius: '0',
								border: 'none'
							}}
						>
							<ProjectPanel className='w-full flex-1' state={state} />
							<div className='flex h-full w-full'>
								<div className='h-100 flex w-2/12 min-w-56 flex-col'>
									<FileExplorerPanel
										files={state.currentProjectData.files}
										className='h-100 w-100 flex flex-1 flex-col'
									/>
								</div>

								<div
									className={twJoin(
										'h-full',
										'flex-1',
										'border border-b-0 border-l-0 border-t-0 border-r-dark-700',
										'bg-dark-900'
									)}
								>
									<SandpackCodeEditor
										closableTabs={true}
										style={{
											width: '100%',
											height: '100%'
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
			) : (
				<ErrorLoading
					errorMessage='Failed to load project, please try again'
					icon={<FaExclamationCircle size={24} />}
				/>
			)}
		</>
	);
};
