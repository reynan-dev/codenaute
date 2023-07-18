import type { CodegenConfig } from '@graphql-codegen/cli';
import pkg from './package.json';
import dotenv from 'dotenv';

const target = process.env.REACT_APP_SERVER_URL || pkg.proxy;

const config: CodegenConfig = {
	overwrite: true,
	schema: target + '/graphql',
	documents: 'src/**/*.ts',
	generates: {
		'src/graphql/__generated__/': {
			preset: 'client',
			plugins: []
		}
	}
};

export default config;
