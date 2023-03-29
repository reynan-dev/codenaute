import Button from 'components/Button';

import { FiLogOut } from 'react-icons/fi';

interface LogOutButtonProps {}

export const LogOutButton = ({}: LogOutButtonProps) => {
	return (
		<Button designType='text' onClick={() => {}} className='flex'>
			<FiLogOut className='mt-1 mr-2' /> Log out
		</Button>
	);
};
