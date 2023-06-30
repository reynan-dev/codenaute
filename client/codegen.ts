import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	overwrite: true,
	schema: 'http://localhost:5050',
	documents: 'src/**/*.ts',
	generates: {
		'src/graphql/__generated__/': {
			preset: 'client',
			plugins: []
		}
	}
};

export default config;
