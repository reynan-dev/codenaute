'use strict';
/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = {
	// Automatically clear mock calls, instances, contexts and results before every test
	clearMocks: true,
	// Indicates whether the coverage information should be collected while executing the test
	collectCoverage: true,
	// The directory where Jest should output its coverage files
	coverageDirectory: './tests/coverage',
	// An array of regexp pattern strings used to skip coverage collection
	coveragePathIgnorePatterns: ['/node_modules/', '/src/migrations/'],
	// Indicates which provider should be used to instrument code for coverage
	coverageProvider: 'v8',
	// A preset that is used as a base for Jest's configuration
	preset: 'ts-jest',
	// The test environment that will be used for testing
	testEnvironment: 'jest-environment-node'
	// The glob patterns Jest uses to detect test files
};
