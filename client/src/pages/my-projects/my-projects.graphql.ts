import { gql } from '@apollo/client';

export const GET_ALL_PROJECTS_BY_OWNER = gql`
	query GetAllProjectsByOwner {
		getAllProjectsByOwner {
			owner {
				email
				id
				username
			}
			files
			mainFile
			sandpackTemplate
			name
			id
		}
	}
`;
