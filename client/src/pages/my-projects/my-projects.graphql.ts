import { gql } from '@apollo/client';

export const UPDATE_PROJECT_MUTATION = gql`
	query ExampleQuery {
		getAllProjectsByOwner {
			name
			sandpackTemplate
			owner {
				id
				email
				username
			}
			files
			main
		}
	}
`;
