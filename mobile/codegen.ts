import type { CodegenConfig } from '@graphql-codegen/cli';
import pkg from './package.json';
import dotenv from 'dotenv';

const config: CodegenConfig = {
	overwrite: true,
	schema: process.env.SERVER_URL || pkg.proxy + '/graphql',
	documents: 'src/**/*.graphql.ts',
	generates: {
		'src/gql/__generated__/': {
			preset: 'client',
			plugins: []
		}
	}
};

export default config;
