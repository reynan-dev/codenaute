import type { CodegenConfig } from '@graphql-codegen/cli';
import dotenv from 'dotenv';

const config: CodegenConfig = {
	overwrite: true,
	schema: process.env.GRAPHQL_SCHEMA || 'http://localhost:5000/graphql',
	documents: 'src/**/*.ts',
	generates: {
		'src/graphql/__generated__/': {
			preset: 'client',
			plugins: []
		}
	}
};

export default config;
