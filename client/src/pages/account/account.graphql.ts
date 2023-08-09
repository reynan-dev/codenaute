import { gql } from '@apollo/client';

export const UPDATE_EMAIL_MUTATION = gql`
	mutation UpdateEmail($email: String!) {
		updateMemberEmail(email: $email) {
			email
			id
		}
	}
`;

export const UPDATE_PASSWORD_MUTATION = gql`
	mutation UpdatePassword(
		$newPassword: String!
		$confirmedNewPassword: String!
		$oldPassword: String!
	) {
		updateMemberPassword(
			newPassword: $newPassword
			confirmedNewPassword: $confirmedNewPassword
			oldPassword: $oldPassword
		) {
			id
			email
		}
	}
`;

export const UPDATE_USERNAME_MUTATION = gql`
	mutation UpdateUsername($username: String!) {
		updateMemberUsername(username: $username) {
			username
			id
		}
	}
`;

export const DELETE_ACCOUNT_MUTATION = gql`
	mutation DeleteAccount($password: String!) {
		deleteMemberAccount(password: $password)
		{}
	}
`;
