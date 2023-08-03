import type { CodegenConfig } from '@graphql-codegen/cli';
import pkg from './package.json';
import dotenv from 'dotenv';

const config: CodegenConfig = {
	overwrite: true,
	schema: process.env.REACT_APP_SERVER_URL || pkg.proxy + '/graphql',
	documents: 'src/**/*.ts',
	generates: {
		'src/graphql/__generated__/': {
			preset: 'client',
			plugins: []
		}
	}
};

export default config;
