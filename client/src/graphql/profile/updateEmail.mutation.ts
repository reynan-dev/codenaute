import { gql } from '@apollo/client';

export const UPDATE_EMAIL_MUTATION = gql`
	mutation UpdateEmail($email: String!) {
		updateEmail(email: $email) {
			email
			id
		}
	}
`;
