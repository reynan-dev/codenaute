import { useQuery } from '@apollo/client';
import { PROFILE } from 'graphql/profile/profile.query';
import { ProfileQuery } from 'graphql/__generated__/graphql';

export type ProfileData = ProfileQuery['profile'] | null;

export const useProfile = (setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>) => {
	const { loading, refetch, data, error } = useQuery<ProfileQuery>(PROFILE, {
		onCompleted: (data) => {
			if (data.profile) {
				setIsAuthenticated(true);
			}
		},
		onError: () => {
			setIsAuthenticated(false);
		}
	});

	return { loading, refetch, data, error };
};
