import { useQuery } from '@apollo/client';
import { PROFILE_QUERY } from 'context/auth/profile.graphql';
import { ProfileQuery } from 'graphql/__generated__/graphql';

export type ProfileData = ProfileQuery['profile'] | null;

export const useProfile = (setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>) => {
	const { loading, refetch, data, error } = useQuery<ProfileQuery>(PROFILE_QUERY, {
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
