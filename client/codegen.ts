import type { CodegenConfig } from '@graphql-codegen/cli';
import dotenv from 'dotenv';

const config: CodegenConfig = {
	overwrite: true,
	schema: process.env.SERVER_URL,
	documents: 'src/**/*.ts',
	generates: {
		'src/graphql/__generated__/': {
			preset: 'client',
			plugins: []
		}
	}
};

export default config;
