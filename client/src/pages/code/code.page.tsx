// import { findBreakingChanges } from 'graphql';

import {
	SandpackCodeEditor,
	SandpackConsole,
	SandpackFileExplorer,
	SandpackLayout,
	SandpackPreview,
	SandpackProvider
} from '@codesandbox/sandpack-react';

// import { isBooleanObject } from 'util/types';
const files: File[] = [
	{
		name: 'index.ts',
		code: "console.log('haha')"
	},
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
		"main": "/index.tsx"
		}`
	}
];

const dependencies = JSON.parse(
	files.filter((e) => e.name === 'package.json')[0].code
).dependencies;

const devDependencies = JSON.parse(
	files.filter((e) => e.name === 'package.json')[0].code
).devDependencies;

interface File {
	[k: string]: string;

	name: string;
	code: string;
}

const ArrayToObject = (files: File[]) => {
	let filesObject: File = { name: '', code: '' };

	files.map((e) => {
		return (filesObject[e.name] = `${e.code}`);
	});

	return filesObject;
};

export const CodePage = () => {
	return (
		<SandpackProvider
			theme={'dark'}
			style={{ height: '100%' }}
			files={ArrayToObject(files)}
			customSetup={{ dependencies: dependencies, devDependencies: devDependencies }}
		>
			<SandpackLayout
				style={{
					width: '100%',
					height: '100%'
				}}
			>
				<SandpackFileExplorer
					style={{
						width: '10%',
						height: '100%'
					}}
				/>
				<SandpackCodeEditor
					showTabs={true}
					showLineNumbers={true}
					showInlineErrors={true}
					wrapContent={true}
					closableTabs
					showRunButton={true}
					style={{
						width: '100%',
						height: '100%'
					}}
				/>
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
			{/* <CustomSandpack /> */}
		</SandpackProvider>
	);
};
