import Container from 'components/Container';
import { FiUser } from 'react-icons/fi';
import { MdPassword } from 'react-icons/md';
import { PRIMARY } from 'styles/colors';
import { twJoin } from 'tailwind-merge';

interface AccountPageProps {
	updateInformationsForm: JSX.Element;
}

export const AccountPage = ({ updateInformationsForm }: AccountPageProps) => {
	return (
		<Container className='flex items-center justify-center'>
			<div
				className={twJoin(
					'flex flex-col w-full',
					'bg-dark rounded-lg',
					'sm:w-3/4',
					'md:w-1/2',
					'lg:w-11/12',
					'xl:w-4/6'
				)}
			>
				<Container className='w-full border-b border-dark-700'>
					<div className='mb-5 flex items-center space-x-4'>
						<FiUser size={24} color={PRIMARY.DEFAULT} />
						<h3>Update informations</h3>
					</div>
					{updateInformationsForm}
				</Container>
				<Container className=''>
					<div className='mb-5 flex items-center space-x-4'>
						<MdPassword size={24} color={PRIMARY.DEFAULT} />
						<h3>Change password</h3>
					</div>
					{updateInformationsForm}
				</Container>
			</div>
		</Container>
	);
};
