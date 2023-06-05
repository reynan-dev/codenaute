import Button from 'components/button';
import { FiLogOut } from 'react-icons/fi';

interface SignOutButtonProps {
	signOut: () => Promise<void>;
}

export const SignOutButton = ({ signOut }: SignOutButtonProps) => {
	return (
		<Button designType='text' onClick={() => signOut()} className='flex'>
			<FiLogOut className='mr-2 mt-1' /> Sign out
		</Button>
	);
};
