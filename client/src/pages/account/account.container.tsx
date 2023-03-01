import AccountPage from 'pages/account/account.page';
import { UpdateInformationsForm } from 'pages/account/components/UpdateInformationsForm';

export const AccountContainer = () => {

	return (
		<AccountPage
			updateInformationsForm={
				<UpdateInformationsForm />
			}
		/>
	);
}
