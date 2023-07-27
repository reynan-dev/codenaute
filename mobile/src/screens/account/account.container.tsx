import AuthContext from 'context/auth/auth.context';
import { useProfile } from 'context/auth/profile.service';
import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { AccountScreen } from 'screens/account/account.screen';

export interface AccountState {}

export const AccountContainer = () => {
	const { setIsAuthenticated } = useContext(AuthContext);
	const { loading, refetch, data: profile, error } = useProfile(setIsAuthenticated);

	console.log({ profile });

	return (
		<View>
			{loading || profile === undefined ? (
				<Text>Loading</Text>
			) : (
				<AccountScreen profile={profile} />
			)}
		</View>
	);
};
