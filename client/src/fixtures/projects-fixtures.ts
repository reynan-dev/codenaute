export interface File {
	name: string;
	code: string;
	programmingLanguage: string;
}

export type Files = File[];

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
		code: "console.log('haha')\nconsole.error('prout')",
		programmingLanguage: 'typescript'
	}
];

export const projectFixtures = {
	id: 'id',
	name: 'name',
	sandpackTemplate: {
		id: 'id',
		name: 'name'
	},
	files: filesFixtures
};
