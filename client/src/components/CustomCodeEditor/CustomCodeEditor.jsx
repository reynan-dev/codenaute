import { FileTabs, SandpackStack, useActiveCode, useSandpack } from '@codesandbox/sandpack-react';
import Editor from '@monaco-editor/react';
import ResizePanel from 'react-resize-panel';
// import { emmetCSS, emmetHTML } from "emmet-monaco-es";
import { getLanguageOfFile } from './utils';

const CustomCodeEditor = () => {
	const { code, updateCode } = useActiveCode();
	const { sandpack } = useSandpack();
	const language = getLanguageOfFile(sandpack.activeFile);

	// const handleEditorDidMount = (editor, monaco) => {
	//   emmetHTML(monaco);
	//   emmetCSS(monaco);
	// };

	return (
		<ResizePanel height={this.state.height} width={this.state.width} onResize={this.onResize}>
			<div className='h-screen'>
				<SandpackStack
					style={{
						height: '100vh',
						width: '100vw'
					}}
				>
					<FileTabs />
					<Editor
						style={{
							height: '100%',
							width: '100%'
						}}
						width='100%'
						height='100%'
						language={language}
						theme='vs-dark'
						// onMount={handleEditorDidMount}
						key={sandpack?.activeFile}
						defaultValue={code}
						onChange={(value) => updateCode(value || '')}
						options={{
							minimap: {
								enabled: true
							},
							fontSize: 14
						}}
					/>
				</SandpackStack>
			</div>
		</ResizePanel>
	);
};

export default CustomCodeEditor;
