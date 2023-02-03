import {
	SandpackCodeEditor,
	SandpackConsole,
	SandpackLayout,
	SandpackPreview,
	SandpackProvider,
	SandpackFileExplorer
} from '@codesandbox/sandpack-react';
//import CustomSandpack from "components//CustomCodeEditor/CustomSandpack";

export default function Editor() {
	return (
		<SandpackProvider theme={'dark'} style={{ height: '100%' }} template="react-ts">

			<SandpackLayout
				style={{
					width: '100%',
					height: '100%'
				}}
			>
				<SandpackFileExplorer
 				style={{
					width: '10%',
					height: '100%'
				}}/>
				<SandpackCodeEditor
					showTabs={true}
					showLineNumbers={true}
					showInlineErrors={true}
					wrapContent={true}
					closableTabs
					showRunButton={true}
					style={{
						width: '100%',
						height: '100%'
					}}
				/>
				<SandpackPreview
					showNavigator
					showOpenInCodeSandbox={false}
					style={{
						width: '100%',
						height: '100%'
					}}
				/>
				<SandpackConsole
					style={{
						width: '100%',
						height: '100%'
					}}
				/>
			</SandpackLayout>
			{/* <CustomSandpack /> */}
		</SandpackProvider>
	);
}
