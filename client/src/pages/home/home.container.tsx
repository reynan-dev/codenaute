import { ProfileQuery } from 'graphql/__generated__/graphql';
import HomePage from './home.page';

export interface HomeContainerProps {
	isAuthenticated: boolean;
	memberProfileData?: ProfileQuery;
}

export default function HomeContainer(props: HomeContainerProps) {
	return <HomePage {...props} />;
}
