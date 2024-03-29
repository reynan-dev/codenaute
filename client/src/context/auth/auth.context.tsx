import { createContext, ReactNode, useEffect, useState } from 'react';
import { ProfileQuery } from 'graphql/__generated__/graphql';
import { ApolloQueryResult, OperationVariables } from '@apollo/client';
import { useProfile } from 'context/auth/profile.service';
export interface AuthContextProps {
	profile: ProfileQuery | null;
	isLoading: boolean;
	refetch:
		| ((
				variables?: Partial<OperationVariables> | undefined
		  ) => Promise<ApolloQueryResult<ProfileQuery>>)
		| (() => void);
	isAuthenticated: boolean;
	setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
	setProfile: React.Dispatch<React.SetStateAction<ProfileQuery | null>>;
}

export const AuthContext = createContext<AuthContextProps>({
	profile: null,
	isLoading: true,
	refetch: () => {},
	isAuthenticated: false,
	setIsAuthenticated: () => {},
	setProfile: () => null
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [profile, setProfile] = useState<ProfileQuery | null>(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const { loading, refetch, data, error } = useProfile(setIsAuthenticated);

	useEffect(() => {
		if (error || !data) {
			setProfile(null);
		} else if (data) {
			setProfile(data);
		}
	}, [data, error]);

	return (
		<AuthContext.Provider
			value={{
				profile,
				isLoading: loading,
				refetch,
				isAuthenticated,
				setIsAuthenticated,
				setProfile
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
