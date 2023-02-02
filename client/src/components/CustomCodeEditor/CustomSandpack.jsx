import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

import {
	SandpackConsole,
	SandpackLayout,
	SandpackPreview,
	SandpackProvider
} from '@codesandbox/sandpack-react';

import CustomCodeEditor from './CustomCodeEditor';
import { FILES } from './constants';

const CustomSandpack = ({ previewRef, consoleRef }) => {
	return (
		<SandpackProvider
			template='vanilla'
			options={{
				visibleFiles: ['index.html', 'src/styles.css', 'src/index.js'],
				activeFile: 'index.html'
			}}
			files={FILES.vanilla}
		>
			<SandpackLayout style={{ borderRadius: 0, height: '100vh', width: '100%' }}>
				<div className='flex h-full w-full'>
					<PanelGroup direction='horizontal'>
						<Panel className='h-full w-full'>
							<CustomCodeEditor showTabs={true} />
						</Panel>
						<PanelResizeHandle className='w-1 bg-gray-800 transition-colors hover:bg-gray-600' />
						<Panel className='border-l border-gray-600' collapsible={true} ref={previewRef}>
							<PanelGroup direction='vertical'>
								<Panel defaultSize={70} className='border-b border-gray-600'>
									<SandpackPreview
										showNavigator
										style={{
											height: '100%'
										}}
									/>
								</Panel>
								<PanelResizeHandle className='h-[0.25rem] bg-gray-800 transition-colors hover:bg-gray-600' />
								<Panel defaultSize={30} collapsible={true} ref={consoleRef}>
									<SandpackConsole
										style={{
											height: '100%'
										}}
									/>
								</Panel>
							</PanelGroup>
						</Panel>
					</PanelGroup>
				</div>
			</SandpackLayout>
		</SandpackProvider>
	);
};

export default CustomSandpack;
