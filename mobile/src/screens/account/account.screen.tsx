import { ProfileQuery } from 'gql/__generated__/graphql';
import { View } from 'react-native';

interface AccountScreenProps {}

interface AccountScreenProps {
	profile: ProfileQuery | null;
}

export const AccountScreen = ({ profile }: AccountScreenProps) => {
	return <View>{profile?.profile.username}</View>;
};
