import { gql } from "@apollo/client";

export const SIGN_UP_MUTATION = gql`
	mutation SignUp($username: String!, $email: String!, $password: String!) {
		signUp(username: $username, email: $email, password: $password) {
			id
			email
		}
	}
`;
