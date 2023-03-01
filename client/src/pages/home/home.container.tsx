import { ProfileQuery } from 'graphql/__generated__/graphql';
import { HomePage } from './home.page';

export interface HomeContainerProps {
	isAuthenticated: boolean;
	profileData?: ProfileQuery;
}

export const HomeContainer = (props: HomeContainerProps) => {
	return <HomePage {...props} />;
};
