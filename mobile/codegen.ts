import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	overwrite: true,
	schema: 'http://localhost:5000',
	documents: 'operations/*.ts',
	generates: {
		'__graphql__/': {
			preset: 'client',
			plugins: []
		}
	}
};

export default config;
