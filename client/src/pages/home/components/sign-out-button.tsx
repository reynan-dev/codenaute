import Button from 'components/button';
import { FiLogOut } from 'react-icons/fi';

interface SignOutButtonProps {
	handleSignOut: () => Promise<void>;
}

export const SignOutButton = ({handleSignOut}: SignOutButtonProps) => {
	return (
		<Button designType='text' onClick={() => handleSignOut()} className='flex'>
			<FiLogOut className='mt-1 mr-2' /> Sign out
		</Button>
	);
};
