import Container from 'components/Container';
import { FiTrash2, FiUser } from 'react-icons/fi';
import { MdPassword } from 'react-icons/md';

import { DANGER, PRIMARY } from 'styles/colors';
import { twJoin } from 'tailwind-merge';

interface AccountPageProps {
	updateInformationsForm: JSX.Element;
	updatePasswordForm: JSX.Element;
	deleteAccountForm: JSX.Element;
}

export const AccountPage = ({
	updateInformationsForm,
	updatePasswordForm,
	deleteAccountForm
}: AccountPageProps) => {
	return (
		<Container className='flex items-start lg:h-full lg:items-center justify-center'>
			<div
				className={twJoin(
					'flex w-full flex-col',
					'rounded-lg bg-dark',
					'sm:w-3/4',
					'md:w-11/12',
					'xl:w-4/6'
				)}
			>
				<Container className='border-b border-dark-700 py-14'>
					<div className='mb-5 flex items-center space-x-4'>
						<FiUser size={24} color={PRIMARY.DEFAULT} />
						<h3>Update informations</h3>
					</div>
					{updateInformationsForm}
				</Container>
				<Container className='border-b border-dark-700 py-14'>
					<div className='mb-5 flex items-center space-x-4'>
						<MdPassword size={24} color={PRIMARY.DEFAULT} />
						<h3>Change password</h3>
					</div>
					{updatePasswordForm}
				</Container>
				<Container className='py-14'>
					<div className='mb-5 flex items-center space-x-4'>
						<FiTrash2 size={24} color={DANGER.DEFAULT} className='mb-0.5' />
						<h3>Delete account</h3>
					</div>
					{deleteAccountForm}
				</Container>
			</div>
		</Container>
	);
};
