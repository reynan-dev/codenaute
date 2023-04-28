/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), viteTsconfigPaths(), svgrPlugin()],
	build: {
		cssMinify: true,
		outDir: 'build'
	},
	server: {
		// open: true,
		port: 3000,
		strictPort: true
	},
	test: {
		globals: true,
		environment: 'jsdom',
		coverage: {
			reporter: ['text', 'html'],
			exclude: ['node_modules/', 'src/setupTests.ts']
		}
	},
	preview: {
		host: 'localhost',
		port: 3000,
		strictPort: true
	},
	base: './'
});