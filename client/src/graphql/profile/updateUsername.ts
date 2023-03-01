import { gql } from '@apollo/client';

export const UPDATE_USERNAME_MUTATION = gql`
	mutation UpdateUsername($username: String!) {
		updateUsername(username: $username) {
			username
			id
		}
	}
`;
