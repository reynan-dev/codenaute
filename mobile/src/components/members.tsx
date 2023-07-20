import { useMutation, useQuery } from '@apollo/client';
import {
	CreateProjectMutation,
	CreateProjectMutationVariables,
	GetAllMembersQuery
} from '__graphql__/graphql';
import { CREATE_PROJECT_MUTATION } from 'operations/create-project.graphql';
import { GET_ALL_MEMBERS_QUERY } from 'operations/get-all-members';
import { useEffect } from 'react';
import { TextProps, Button, Text } from 'react-native';

export function Members(props: TextProps) {
	const [createProjectMutation, { data, loading }] = useMutation<
		CreateProjectMutation,
		CreateProjectMutationVariables
	>(CREATE_PROJECT_MUTATION);

	const {
		loading: membersLoading,
		data: membersData,
		error: membersError
	} = useQuery<GetAllMembersQuery>(GET_ALL_MEMBERS_QUERY);

	useEffect(() => {
		if (membersError) return console.log({ membersError });
		if (!membersLoading) console.log({ membersData });
	}, [membersLoading, membersData]);

	const createProject = async () => {
		await createProjectMutation({
			variables: {
				name: 'untitled',
				memberId: '1303de4d-8afd-4c4b-a1b4-c742e11ea627',
				isTemplate: false,
				isPublic: false,
				sandpackTemplate: 'react-ts',
				files: JSON.stringify({})
			},
			onCompleted(data) {
				console.log({ data });
			},
			onError(error) {
				console.log({ error });
			}
		});
	};

	return (
		<>
			{!loading
				? membersData?.getAllMembers.map((member, index) => (
						<Text key={index} {...props} className='bg-primary'>
							{member.username}
						</Text>
				  ))
				: null}
			<Button onPress={() => createProject()} title='CREATE PROJECT' />
		</>
	);
}
