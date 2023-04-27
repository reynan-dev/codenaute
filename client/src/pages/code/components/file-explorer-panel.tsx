import {
	SandpackFile,
	SandpackFileExplorer,
	useActiveCode,
	useSandpack
} from '@codesandbox/sandpack-react';
import { Editor, useMonaco } from '@monaco-editor/react';
import { useEffect } from 'react';
import { FiFilePlus, FiFolderPlus } from 'react-icons/fi';
import COLORS from 'styles/colors';

interface FileExplorerPanelProps {
	className?: string;
}

export const FileExplorerPanel = ({ className }: FileExplorerPanelProps) => {
	return (
		<div className={className}>
			<div className='flex justify-between border border-y-0 border-l-0 border-r-dark-700 border-t-dark-700 bg-dark-900 p-2'>
				<h3 className='text-sm font-normal text-dark-300'>Files</h3>
				<div className='flex items-center justify-end space-x-2'>
					<FiFilePlus size={16} className='text-dark-300' />
					<FiFolderPlus size={16} className='text-dark-300' />
				</div>
			</div>
			<div className='h-full border border-l-0 border-r-dark-700 border-t-dark-700'>
				<SandpackFileExplorer
					style={{
						height: '100%'
					}}
				/>
			</div>
		</div>
	);
};
