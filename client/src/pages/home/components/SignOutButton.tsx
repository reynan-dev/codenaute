import Button from 'components/Button';

import { FiLogOut } from 'react-icons/fi';

interface SignOutButtonProps {
	handleSignOut: () => Promise<void>;
}

export const SignOutButton = ({ handleSignOut }: SignOutButtonProps) => {
	return (
		<Button designType='text' onClick={() => handleSignOut()} className='flex'>
			<FiLogOut className='mr-2 mt-1' /> Sign out
		</Button>
	);
};
