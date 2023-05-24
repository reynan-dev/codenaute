import { gql } from '@apollo/client';

export const CREATE_PROJECT_MUTATION = gql`
	mutation UpdateProject(
		$name: String!
		$projectId: String!
		$isTemplate: Boolean!
		$isPublic: Boolean!
		$sandpackTemplate: String!
		$files: String!
	) {
		updateProject(
			name: $name
			projectId: $projectId
			isTemplate: $isTemplate
			isPublic: $isPublic
			sandpackTemplate: $sandpackTemplate
			files: $files
		) {
			owner {
				username
				id
			}
			name
			isTemplate
			isPublic
			id
			files
		}
	}
`;
