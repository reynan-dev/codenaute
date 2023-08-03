import { gql } from '@apollo/client';

export const PROFILE_QUERY = gql`
	query Profile {
		profile {
			id
			username
			email
		}
	}
`;
