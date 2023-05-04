export interface File {
	name: string;
	code: string;
	programmingLanguage: string;
}

export type Files = File[];

export interface Project {
	id: string;
	name: string;
	sandpackTemplate: {
		id: string;
		name: string;
	};
	files: Files;
}

export const filesFixtures: Files = [
	{
		name: '/package.json',
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
		"main": "src/index.tsx"
		}`,
		programmingLanguage: 'json'
	},
	{
		name: '/src/index.ts',
		code: "console.log('haha')",
		programmingLanguage: 'typescript'
	}
];

export const projectFixtures: Project = {
	id: '0000',
	name: 'projectName',
	sandpackTemplate: {
		id: '0000',
		name: 'react-ts'
	},
	files: filesFixtures
};