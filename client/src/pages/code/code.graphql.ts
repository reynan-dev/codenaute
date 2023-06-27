import { gql } from '@apollo/client';

export const UPDATE_PROJECT_MUTATION = gql`
	mutation UpdateProject(
		$name: String!
		$projectId: String!
		$isTemplate: Boolean!
		$isPublic: Boolean!
		$sandpackTemplate: String!
		$files: String!
		$environment: String!
	) {
		updateProject(
			name: $name
			projectId: $projectId
			isTemplate: $isTemplate
			isPublic: $isPublic
			sandpackTemplate: $sandpackTemplate
			files: $files
			environment: $environment
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
			sandpackTemplate
			environment
		}
	}
`;

export const GET_PROJECT_BY_ID_QUERY = gql`
	query GetProjectById($projectId: String!) {
		getProjectById(projectId: $projectId) {
			owner {
				id
				sessions {
					member {
						sessions {
							member {
								id
							}
						}
					}
				}
			}
			name
			isTemplate
			id
			isPublic
			files
			sandpackTemplate
			environment
		}
	}
`;