/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import commonjs from '@rollup/plugin-commonjs';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), viteTsconfigPaths(), svgrPlugin()],
	build: {
		target: 'ESNext',
		cssMinify: true,
		outDir: 'dist',
		minify: 'esbuild',
		rollupOptions: {
			input: 'src/index.tsx',
			output: {
				format: 'es'
			},
			plugins: [commonjs()]
		}
	},
	server: {
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
