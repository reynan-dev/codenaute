import Container from 'components/Container';
import { FiUser } from 'react-icons/fi';
import { PRIMARY } from 'styles/colors';
import { MdPassword } from 'react-icons/md';

interface AccountPageProps {
	updateInformationsForm: JSX.Element;
}

export const AccountPage = ({ updateInformationsForm }: AccountPageProps) => {
	return (
		<Container className='flex items-center justify-center'>
			<div className='flex flex-col'>
				<Container className=''>
					<div className='flex items-center space-x-4 mb-8'>
						<FiUser size={24} color={PRIMARY.DEFAULT} />
						<h3>Update informations</h3>
					</div>
					{updateInformationsForm}
				</Container>
				<Container className=''>
					<div className='flex items-center space-x-4 mb-8'>
						<MdPassword size={24} color={PRIMARY.DEFAULT} />
						<h3>Change password</h3>
					</div>
					{updateInformationsForm}
				</Container>
			</div>
		</Container>
	);
};
