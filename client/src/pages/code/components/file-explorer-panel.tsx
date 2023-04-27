import { SandpackFileExplorer } from '@codesandbox/sandpack-react';
import Input from 'components/input';
import Modal from 'components/modal';
import { Project } from 'fixtures/projects-fixtures';
import { useState } from 'react';
import { FiFilePlus, FiFolderPlus } from 'react-icons/fi';

interface FileExplorerPanelProps {
	className?: string;
	setProjectData: React.Dispatch<React.SetStateAction<Project | null>>;
}

export const FileExplorerPanel = ({ className, setProjectData }: FileExplorerPanelProps) => {
	const [isNewFileModalOpen, setIsNewFileModalOpen] = useState(false);
	const [newFile, setNewFile] = useState('');

	const handleNewFileModalClose = () => {
		setIsNewFileModalOpen(false);
	};

	return (
		<>
			<div className={className}>
				<div className='flex justify-between border border-y-0 border-l-0 border-r-dark-700 border-t-dark-700 bg-dark-900 p-2'>
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
				<div className='flex flex-col items-center justify-center space-y-5'>
					<h4>Créer fichier</h4>
					<Input
						label='Nom du fichier'
						autoComplete='off'
						type='text'
						value={newFile}
						onChange={(event) => {
							setNewFile(event.target.value);
						}}
						// error={state.formErrorMessages?.confirmedPassword}
					/>
				</div>
			</Modal>
		</>
	);
};
