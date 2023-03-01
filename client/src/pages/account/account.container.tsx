import { ProfileQuery } from 'graphql/__generated__/graphql';
import { AccountPage } from 'pages/account/account.page';
import { UpdateInformationsForm } from 'pages/account/components/UpdateInformationsForm';

export interface AccountContainerProps {
	isProfileLoading: boolean;
	profileData: ProfileQuery | undefined;
}

export const AccountContainer = (props: AccountContainerProps) => {
	return <AccountPage {...props} updateInformationsForm={<UpdateInformationsForm {...props} />} />;
};
