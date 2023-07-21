import { OperationVariables, ApolloQueryResult } from '@apollo/client';
import { useProfile } from 'context/auth/profile.service';
import { ProfileQuery } from 'gql/__generated__/graphql';
import { createContext, ReactNode, useState, useEffect } from 'react';

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
}

export const AuthContext = createContext<AuthContextProps>({
	profile: null,
	isLoading: true,
	refetch: () => {},
	isAuthenticated: false,
	setIsAuthenticated: () => {}
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
			value={{ profile, isLoading: loading, refetch, isAuthenticated, setIsAuthenticated }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
