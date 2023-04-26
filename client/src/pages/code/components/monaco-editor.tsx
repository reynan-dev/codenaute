import { SandpackFile, useActiveCode, useSandpack } from '@codesandbox/sandpack-react';
import { Editor } from '@monaco-editor/react';

interface MonacoEditorProps {
	files: Record<string, { code: string | SandpackFile; programmingLanguage: string }>;
}

export const MonacoEditor = ({ files }: MonacoEditorProps) => {
	const { code, updateCode } = useActiveCode();
	const { sandpack } = useSandpack();

	const getActiveFileLanguage = (activeFile: string) => {
		return files[activeFile.replace('/', '')].programmingLanguage;
	};

	return (
		<div style={{ flex: 1, paddingTop: 8, background: '#1e1e1e' }}>
			<Editor
				width='100%'
				height='100%'
				language={getActiveFileLanguage(sandpack.activeFile)}
				theme='vs-dark'
				key={sandpack.activeFile}
				defaultValue={code}
				onChange={(value) => updateCode(value || '')}
			/>
		</div>
	);
};
