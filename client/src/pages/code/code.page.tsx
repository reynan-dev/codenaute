import {
	SandpackConsole,
	SandpackFile,
	SandpackFileExplorer,
	SandpackLayout,
	SandpackPreview,
	SandpackProvider
} from '@codesandbox/sandpack-react';
import { MonacoEditor } from 'pages/code/components/monaco-editor';
import { sandpackCustomTheme } from 'styles/sandpack-theme';

export type FilesTree = {
	[key: string]: { name: string; code: string; programmingLanguage: string }[];
};

const filesTree: FilesTree = {
	root: [
		{
			name: 'package.json',
			code: `{
		"dependencies": {
		"react": "^18.0.0",
		"react-dom": "^18.0.0",
		"react-scripts": "^4.0.0"
		},
		"devDependencies": {
		"@types/react": "^18.0.0",
		"@types/react-dom": "^18.0.0",
		"typescript": "^4.0.0",
		"jest": "^27.0.0"
		},
		"main": "index.tsx"
		}`,
			programmingLanguage: 'json'
		}
	],
	src: [
		{
			name: 'src/index.ts',
			code: "console.log('haha')\nconsole.error('prout')",
			programmingLanguage: 'typescript'
		}
	]
};

const dependencies = JSON.parse(
	filesTree.root.filter((e) => e.name === 'package.json')[0].code
).dependencies;

const devDependencies = JSON.parse(
	filesTree.root.filter((e) => e.name === 'package.json')[0].code
).devDependencies;

const MapFilesForSandpack = (filesTree: FilesTree) => {
	let filesObject: Record<string, string | SandpackFile> = {};

	Object.values(filesTree).map((directory) => {
		return directory.map((e) => {
			return e.name && (filesObject[e.name] = `${e.code}`);
		});
	});

	return filesObject;
};

const MapFilesForMonacoEditor = (filesTree: FilesTree) => {
	let filesObject: Record<string, { code: string | SandpackFile; programmingLanguage: string }> =
		{};

	Object.values(filesTree).map((directory) => {
		return directory.map((e) => {
			return (
				e.name &&
				(filesObject[e.name] = { code: `${e.code}`, programmingLanguage: e.programmingLanguage })
			);
		});
	});

	return filesObject;
};

export const CodePage = () => {
	return (
		<SandpackProvider
			theme={sandpackCustomTheme}
			style={{ height: '100%' }}
			// template='react-ts'
			files={MapFilesForSandpack(filesTree)}
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
				<div className='h-100 flex flex-col'>
					<p>Actions buttons</p>
					<SandpackFileExplorer
						style={{
							// width: '10%',
							height: '100%'
						}}
					/>
				</div>
				<MonacoEditor files={MapFilesForMonacoEditor(filesTree)} />
				<SandpackPreview
					showNavigator
					showOpenInCodeSandbox={false}
					style={{
						width: '100%',
						height: '100%'
					}}
				/>
				<SandpackConsole
					style={{
						width: '100%',
						height: '100%'
					}}
				/>
			</SandpackLayout>
		</SandpackProvider>
	);
};
