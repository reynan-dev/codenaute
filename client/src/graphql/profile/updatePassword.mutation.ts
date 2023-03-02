import { gql } from '@apollo/client';

export const UPDATE_PASSWORD_MUTATION = gql`
	mutation UpdatePassword(
		$newPassword: String!
		$confirmedNewPassword: String!
		$oldPassword: String!
	) {
		updatePassword(
			newPassword: $newPassword
			confirmedNewPassword: $confirmedNewPassword
			oldPassword: $oldPassword
		) {
			id
			email
		}
	}
`;
