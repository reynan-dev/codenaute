import { gql } from '@apollo/client';

export const CREATE_PROJECT_MUTATION = gql`
	mutation CreateProject(
		$name: String!
		$memberId: String!
		$isTemplate: Boolean!
		$isPublic: Boolean!
		$sandpackTemplate: String!
		$files: String!
		$environment: String!
	) {
		createProject(
			name: $name
			memberId: $memberId
			isTemplate: $isTemplate
			isPublic: $isPublic
			sandpackTemplate: $sandpackTemplate
			files: $files
			environment: $environment
		) {
			id
			name
			owner {
				id
			}
			files
			environment
			isTemplate
			isPublic
			sandpackTemplate
		}
	}
`;
