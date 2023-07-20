import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	overwrite: true,
	schema: 'http://localhost:5000',
	documents: 'operations/**/*.ts',
	generates: {
		'graphql/': {
			preset: 'client',
			plugins: []
		}
	}
};

export default config;
