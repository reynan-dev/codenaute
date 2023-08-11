import { gql } from '@apollo/client';

export const CREATE_PROJECT_MUTATION = gql`
	mutation CreateProject(
		$name: String!
		$memberId: String!
		$isPublic: Boolean!
		$sandpackTemplate: String!
		$files: String!
		$environment: String!
		$mainFile: String!
	) {
		createProject(
			name: $name
			memberId: $memberId
			isPublic: $isPublic
			sandpackTemplate: $sandpackTemplate
			files: $files
			environment: $environment
			mainFile: $mainFile
		) {
			id
			name
			owner {
				id
			}
			files
			environment
			mainFile
			isPublic
			sandpackTemplate
		}
	}
`;
