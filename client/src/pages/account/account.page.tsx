import Container from 'components/Container';
import { FiUser } from 'react-icons/fi';
import { PRIMARY } from 'styles/colors';
import { MdPassword } from 'react-icons/md';
import { twJoin } from 'tailwind-merge';

interface AccountPageProps {
	updateInformationsForm: JSX.Element;
}

export const AccountPage = ({ updateInformationsForm }: AccountPageProps) => {
	return (
		<Container className='flex items-center justify-center'>
			<div
				className={twJoin(
					'flex flex-col',
					'w-full',
					'sm:w-3/4',
					'md:w-1/2',
					'lg:w-11/12',
					'xl:w-4/6'
				)}
			>
				<Container className='w-full'>
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
