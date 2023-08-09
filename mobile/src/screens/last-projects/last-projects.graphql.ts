import { gql } from '@apollo/client';

export const GET_ALL_PUBLIC_PROJECTS = gql`
	query GetAllPublicProjects {
		getAllPublicProjects {
			id
			files
			mainFile
			name
			createdAt
			owner {
				username
			}
			environment
			sandpackTemplate
		}
	}
`;
