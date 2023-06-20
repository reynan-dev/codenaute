import { gql } from '@apollo/client';

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
		}
	}
`;
