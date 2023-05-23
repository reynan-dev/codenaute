import { SandpackFileExplorer, useSandpack } from '@codesandbox/sandpack-react';
import Button from 'components/button';
import Input from 'components/input';
import Modal from 'components/modal';
import { useState } from 'react';
import { FiFilePlus, FiFolderPlus } from 'react-icons/fi';
import { twJoin } from 'tailwind-merge';

interface FileExplorerPanelProps {
	className?: string;
}

export const FileExplorerPanel = ({ className }: FileExplorerPanelProps) => {
	const [isNewFileModalOpen, setIsNewFileModalOpen] = useState(false);
	const [newFile, setNewFile] = useState('');

	const handleNewFileModalClose = () => {
		setIsNewFileModalOpen(false);
	};

	const { sandpack } = useSandpack();

	return (
		<>
			<div className={className}>
				<div
					className={twJoin(
						'flex items-center justify-between',
						'h-10',
						'px-3.5 py-2',
						'bg-dark-900',
						'border border-y-0 border-l-0',
						'border-r-dark-700 border-t-dark-700'
					)}
				>
					{' '}
					<h3 className='text-sm font-normal text-dark-300'>Files</h3>
					<div className='flex items-center justify-end space-x-2'>
						<button onClick={() => setIsNewFileModalOpen(true)}>
							<FiFilePlus size={16} className='text-dark-300' />
						</button>
						<FiFolderPlus size={16} className='text-dark-300' />
					</div>
				</div>
				<div className='h-full border border-b-0 border-l-0 border-r-dark-700 border-t-dark-700'>
					<SandpackFileExplorer
						style={{
							height: '100%'
						}}
					/>
				</div>
			</div>
			<Modal isOpen={isNewFileModalOpen} onClose={handleNewFileModalClose}>
				<div className='flex items-center justify-center space-x-5'>
					<Input
						label='File name'
						autoComplete='off'
						type='text'
						value={newFile}
						onChange={(event) => {
							setNewFile(event.target.value);
						}}
						// error={state.formErrorMessages?.confirmedPassword}
					/>
					<Button
						size='small'
						onClick={() => {
							setIsNewFileModalOpen(false);
							sandpack.addFile(`/${newFile}`, '');
						}}
					>
						Add
					</Button>
				</div>
			</Modal>
		</>
	);
};
