import { SandpackFile, useActiveCode, useSandpack } from '@codesandbox/sandpack-react';
import { Editor, useMonaco } from '@monaco-editor/react';
import { useEffect } from 'react';
import COLORS from 'styles/colors';

interface MonacoEditorProps {
	files: Record<string, { code: string | SandpackFile; programmingLanguage: string }>;
	className?: string;
}

export const MonacoEditor = ({ files, className }: MonacoEditorProps) => {
	const { code, updateCode } = useActiveCode();
	const { sandpack } = useSandpack();
	const monaco = useMonaco();

	const getActiveFileLanguage = (activeFile: string) => {
		return files[activeFile].programmingLanguage;
	};

	useEffect(() => {
		monaco?.editor.defineTheme('codenaute', {
			base: 'vs-dark',
			inherit: true,
			rules: [],
			// Not well documented, here is a trick to know all theme keys :
			// https://github.com/microsoft/monaco-editor/issues/1631
			colors: {
				'editor.background': COLORS.DARK[900],
				'scrollbarSlider.background': COLORS.DARK[700],
				'scrollbar.shadow': COLORS.DARK[700],
				'progressBar.background': COLORS.PRIMARY.DEFAULT
			}
		});

		monaco?.editor.setTheme('codenaute');
	}, [monaco, sandpack.activeFile]);

	const options = {
		readOnly: false,
		minimap: { enabled: false },
		padding: { top: 15 },
		extraEditorClassName: '',
		scrollbar: {
			vertical: 'visible' as 'visible'
		}
	};

	return (
		<div className={className}>
			<Editor
				width='100%'
				height='100%'
				language={getActiveFileLanguage(sandpack.activeFile)}
				theme='codenaute'
				key={sandpack.activeFile}
				defaultValue={code}
				onChange={(value) => updateCode(value || '')}
				options={options}
			/>
		</div>
	);
};
