import { SandpackFile } from '@codesandbox/sandpack-react/types';
import { Files, filesFixtures, projectFixtures } from 'fixtures/projects-fixtures';
import { CodePage } from './code.page';

export type Dependencies = Record<string, string>;

const dependencies: Dependencies = JSON.parse(
	filesFixtures.filter((e) => e.name === '/package.json')[0].code
).dependencies;

const devDependencies: Dependencies = JSON.parse(
	filesFixtures.filter((e) => e.name === '/package.json')[0].code
).devDependencies;

const mapFilesForSandpack = (files: Files) => {
	let filesObject: Record<string, string | SandpackFile> = {};

	files.map((e) => {
		return e.name && (filesObject[e.name] = `${e.code}`);
	});

	return filesObject;
};

const mapFilesForMonacoEditor = (files: Files) => {
	let filesObject: Record<string, { code: string | SandpackFile; programmingLanguage: string }> =
		{};

	files.map((e) => {
		return (
			e.name &&
			(filesObject[e.name] = { code: `${e.code}`, programmingLanguage: e.programmingLanguage })
		);
	});

	return filesObject;
};

export const CodeContainer = () => {
	return (
		<CodePage
			mappedFilesForSandpack={mapFilesForSandpack(projectFixtures.files)}
			mappedFilesForMonacoEditor={mapFilesForMonacoEditor(projectFixtures.files)}
			dependencies={dependencies}
			devDependencies={devDependencies}
		/>
	);
};
