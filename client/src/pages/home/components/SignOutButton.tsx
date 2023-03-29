import Button from 'components/Button';

import { FiLogOut } from 'react-icons/fi';

interface SignOutButtonProps {}

export const SignOutButton = ({}: SignOutButtonProps) => {
	return (
		<Button designType='text' onClick={() => {}} className='flex'>
			<FiLogOut className='mt-1 mr-2' /> Sign out
		</Button>
	);
};
