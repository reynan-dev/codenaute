import { gql } from '@apollo/client';

export const GET_ALL_MEMBERS_QUERY = gql`
	query GetAllMembers {
		getAllMembers {
			email
			username
		}
	}
`;
