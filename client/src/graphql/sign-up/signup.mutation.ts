import { gql } from '@apollo/client';

export const SIGN_UP_MUTATION = gql`
	mutation SignUp(
		$username: String!
		$email: String!
		$password: String!
		$confirmedPassword: String!
	) {
		signUp(
			username: $username
			email: $email
			password: $password
			confirmedPassword: $confirmedPassword
		) {
			id
			email
		}
	}
`;
